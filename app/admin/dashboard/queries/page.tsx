"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { queriesService } from "@/services/firestore";
import type { QuerySubmission } from "@/types/content";

export default function QueriesAdminPage() {
  const [queries, setQueries] = useState<QuerySubmission[]>([]);

  useEffect(() => {
    queriesService.list().then(setQueries);
  }, []);

  return (
    <Card className="space-y-3">
      <h1 className="text-xl font-semibold text-slate-900">Saved Queries</h1>
      {queries.length === 0 ? <p className="text-sm text-slate-500">No queries yet.</p> : null}
      {queries.map((query) => (
        <div key={query.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-semibold text-slate-900">{query.name || "Anonymous"}</p>
            <p className="text-slate-500">{new Date(query.createdAt).toLocaleString()}</p>
          </div>
          <p className="text-slate-600">{query.email || "No email provided"}</p>
          <p className="mt-2 font-medium text-slate-900">{query.subject || "General query"}</p>
          <p className="text-slate-600">{query.query}</p>
        </div>
      ))}
    </Card>
  );
}
