import { useState } from "react";
import { Props } from "../model/app.model";

export default function ComposeModal({ onClose, onSuccess, email }: Props) {

  const [to, setTo] = useState(email?.to ? email.to : "");
  const [subject, setSubject] = useState(email?.subject ? email.subject : "");
  const [body, setBody] = useState(email?.body ? email.body : "");
  const [scheduledAt, setScheduledAt] = useState<string>(
    email?.scheduledAt
      ? new Date(email?.scheduledAt).toISOString().slice(0, 16)
      : ""
  );
  const [loading, setLoading] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);

  function handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = e => {
      const text = e.target?.result as string;
      const extracted = text
        .split(/[\n,]/)
        .map(e => e.trim())
        .filter(e => e.includes("@"));
      setEmails(extracted);
    };
    reader.readAsText(file);
  }

  async function submit() {
    setLoading(true);

    const baseTime = new Date(scheduledAt).getTime();

    for (let i = 0; i < emails.length; i++) {
      await fetch("http://localhost:4000/api/emails/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          to: emails[i],
          subject,
          body,
          scheduledAt: new Date(baseTime + i * 2000).toISOString()
        })
      });
    }

    if (to.length) {
      await fetch("http://localhost:4000/api/emails/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          to,
          subject,
          body,
          scheduledAt,
        }),
      });
    }

    setLoading(false);
    onSuccess();
    onClose();
  }


  return (
    <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{!email && "Compose"} Email</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            {!email ? <input
              type="file"
              accept=".csv,.txt"
              className="form-control mb-2"
              onChange={e => {
                if (e.target.files?.[0]) {
                  handleFile(e.target.files[0]);
                }
              }} /> : null}

            {emails.length > 0 && (
              <p className="text-muted">
                {emails.length} email(s) detected
              </p>
            )}

            <input
              className="form-control mb-2"
              placeholder="Recipient Email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              disabled={email}
            />

            <input
              className="form-control mb-2"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={email}
            />

            <textarea
              className="form-control mb-2"
              placeholder="Email body"
              rows={4}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              disabled={email}
            />

            <input
              type="datetime-local"
              className="form-control"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              disabled={email}
            />
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={submit}
              disabled={loading || (!emails.length && !to.length)}
            >
              {loading ? "Scheduling..." : "Schedule"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
