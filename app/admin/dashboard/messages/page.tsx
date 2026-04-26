"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { messagesService } from "@/services/firestore";
import type { ContactMessage } from "@/types/content";

export default function MessagesAdminPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    messagesService.list().then(setMessages);
  }, []);

  return (
    <Card className="space-y-3">
      <h1 className="text-xl font-semibold text-slate-900">Contact Messages</h1>
      {messages.length === 0 ? <p className="text-sm text-slate-500">No messages yet.</p> : null}
      {messages.map((message) => (
        <div key={message.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-semibold text-slate-900">{message.name}</p>
            <p className="text-slate-500">{new Date(message.createdAt).toLocaleString()}</p>
          </div>
          <p className="text-slate-600">{message.email}</p>
          <p className="mt-2 font-medium text-slate-900">{message.subject}</p>
          <p className="text-slate-600">{message.message}</p>
        </div>
      ))}
    </Card>
  );
}
