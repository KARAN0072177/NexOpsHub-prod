"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useCreateService } from "@/hooks/useCreateService";

import {
    createServiceSchema,
    type CreateServiceFormData,
} from "./service.schema";

import { useAuth } from "@/hooks/useAuth";
import { getDevelopmentEnvironment } from "@/components/setup/setup.api";

export function CreateServiceForm() {
    const router = useRouter();

    const {
        createService,
        loading,
        error,
    } = useCreateService();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateServiceFormData>({
        resolver: zodResolver(createServiceSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    const { currentOrganization, refreshUser } = useAuth();

    async function onSubmit(
        data: CreateServiceFormData
    ) {


        if (!currentOrganization) {
            return;
        }

        const { environment } =
            await getDevelopmentEnvironment(
                currentOrganization.id
            );

        const environmentId = environment.id;

        const result = await createService(
            environmentId,
            data
        );

        if (!result) {
            return;
        }

        await refreshUser();

        router.push("/dashboard");
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 rounded-xl border bg-white p-8 shadow-sm"
        >
            <div>
                <h1 className="text-2xl font-semibold">
                    Create your first service
                </h1>

                <p className="mt-2 text-gray-600">
                    Services represent deployable
                    applications within a project.
                </p>
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">
                    Service Name
                </label>

                <input
                    {...register("name")}
                    type="text"
                    placeholder="API"
                    className="w-full rounded-md border p-3"
                    disabled={loading}
                />

                {errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.name.message}
                    </p>
                )}
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">
                    Description (Optional)
                </label>

                <textarea
                    {...register("description")}
                    rows={4}
                    placeholder="Handles authentication and business logic..."
                    className="w-full rounded-md border p-3"
                    disabled={loading}
                />

                {errors.description && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.description.message}
                    </p>
                )}
            </div>

            {error && (
                <p className="text-sm text-red-600">
                    {error}
                </p>
            )}

            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-black py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loading
                    ? "Creating..."
                    : "Create Service"}
            </button>
        </form>
    );
}