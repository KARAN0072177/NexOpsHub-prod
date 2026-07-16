"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import { useCreateProject } from "@/hooks/useCreateProject";

export function CreateProjectForm() {
  const router = useRouter();

  const {
    currentOrganization,
    refreshUser,
  } = useAuth();

  const {
    createProject,
    loading,
    error,
  } = useCreateProject();

  const [name, setName] = useState("");

  const [description, setDescription] =
    useState("");

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!currentOrganization) {
      return;
    }

    const result = await createProject({
      organizationId: currentOrganization.id,
      name: name.trim(),
      description: description.trim(),
    });

    if (!result) {
      return;
    }

    await refreshUser();

    router.push("/setup");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl border bg-white p-8 shadow-sm"
    >
      <div>
        <h1 className="text-2xl font-semibold">
          Create your first project
        </h1>

        <p className="mt-2 text-gray-600">
          Projects organize your applications,
          environments and infrastructure.
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Project Name
        </label>

        <input
          type="text"
          className="w-full rounded-md border p-3"
          placeholder="NexOpsHub"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          disabled={loading || !currentOrganization}
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Description (Optional)
        </label>

        <textarea
          rows={4}
          className="w-full rounded-md border p-3"
          placeholder="Infrastructure monitoring platform..."
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          disabled={loading || !currentOrganization}
        />
      </div>

      {!currentOrganization && (
        <p className="text-sm text-red-600">
          No active organization found.
        </p>
      )}

      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading || !currentOrganization}
        className="w-full rounded-md bg-black py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "Creating..."
          : "Create Project"}
      </button>
    </form>
  );
}