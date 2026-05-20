"use client"

import { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { AskQuestionSchema } from "@/lib/validations";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MDXEditorMethods } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import { z } from "zod";
import TagCard from "@/components/cards/TagCard";

const Editor = dynamic(() => import('@/components/editor'), {
    // Make sure we turn SSR off
    ssr: false
})

const QuestionForm = () => {
    const editorRef = useRef<MDXEditorMethods>(null);

    const form = useForm<z.infer<typeof AskQuestionSchema>>({
        resolver: standardSchemaResolver(AskQuestionSchema),
        defaultValues: {
            title: '',
            content: '',
            tags: []
        }
    });

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, field: { value: string[] }) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const tagInput = e.currentTarget.value.trim()

            if (tagInput && tagInput.length < 15 && !field.value.includes(tagInput)) {
                form.setValue('tags', [...field.value, tagInput]);
                e.currentTarget.value = "";
                form.clearErrors("tags")
            } else if (tagInput.length > 15) {
                form.setError('tags', {
                    type: 'manual',
                    message: "Tag should be less than 15 characters"
                })
            } else if(field.value.includes(tagInput)) {
                form.setError('tags', {
                    type: 'manual',
                    message: "Tag already exists"
                })
            }
        }
    }

    const handleTagRemove = (tag: string, field: { value: string[] }) => {
        const newTags = field.value.filter((t) => t !== tag);
        form.setValue("tags", newTags)

        if (newTags.length === 0) {
            form.setError("tags", {
                type: 'manual',
                message: "Tags are required",
            })
        }
    }

    const handleCreateQuestion = () => {
    }

    const { errors } = form.formState;

    return (
        <form
            onSubmit={form.handleSubmit(handleCreateQuestion)}
            className="flex w-full flex-col gap-10"
        >
            <div className="flex w-full flex-col gap-3">
                <Label
                    htmlFor="title"
                    className="paragraph-semibold text-dark400_light800"
                >
                    Question Title <span className="text-primary-500">*</span>
                </Label>

                <Input
                    id="title"
                    {...form.register("title")}
                    className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
                />

                <p className="body-regular text-gray-500">
                    Be specific and imagine you are asking a question to another person.
                </p>

                {errors.title && (
                    <p className="text-sm font-medium text-destructive">
                        {errors.title.message as string}
                    </p>
                )}
            </div>

            <div className="flex w-full flex-col gap-3">
                <Label
                    htmlFor="content"
                    className="paragraph-semibold text-dark400_light800"
                >
                    Detailed explanation of your problem{" "}
                    <span className="text-primary-500">*</span>
                </Label>

                <Controller
                    name="content"
                    control={form.control}
                    render={({ field }) => (
                        <Editor
                            value={field.value}
                            editorRef={editorRef}
                            fieldChange={field.onChange}
                        />
                    )}
                />

                <p className="body-regular text-gray-500">
                    Introduce the problem and expand on what you've put in the title.
                </p>

                {errors.content && (
                    <p className="text-sm font-medium text-destructive">
                        {errors.content.message as string}
                    </p>
                )}
            </div>

            <div className="flex w-full flex-col gap-3">
                <Label
                    htmlFor="tags"
                    className="paragraph-semibold text-dark400_light800"
                >
                    Tags <span className="text-primary-500">*</span>
                </Label>

                <Controller
                    name="tags"
                    control={form.control}
                    render={({ field }) => (
                        <div>
                            <Input
                                id="tags"
                                className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
                                placeholder="Add tags..."
                                onKeyDown={(e) => handleInputKeyDown(e, field)}
                            />

                            {field.value.length > 0 && (
                                <div className="flex-start mt-2.5 flex-wrap gap-2.5">
                                    {field.value.map((tag: string) =>
                                        <TagCard
                                            key={tag}
                                            _id={tag}
                                            name={tag}
                                            compact
                                            remove
                                            isButton
                                            handleRemove={() => handleTagRemove(tag, field)}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                />

                <p className="body-regular text-gray-500">
                    Add up to 3 tags to describe what your question is about. You need to press enter to add a tag.
                </p>

                {errors.tags && (
                    <p className="text-sm font-medium text-destructive">
                        {errors.tags.message as string}
                    </p>
                )}
            </div>

            {/* --- SUBMIT BUTTON --- */}
            <div className="flex justify-end">
                <Button
                    type="submit"
                    className="primary-gradient !text-light-900 w-fit cursor-pointer"
                >
                    Ask A Question
                </Button>
            </div>
        </form>
    )
}

export default QuestionForm;