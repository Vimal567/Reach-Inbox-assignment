import { Email, Props } from "../model/app.model";

export default function SentTable({ data, setShowCompose }: Props) {
    if (data.length === 0) {
        return <p>No sent emails</p>;
    }

    return (
        <table className="table text-center table-hover pointer">
            <thead>
                <tr>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {data.map((email: Email) => (
                    <tr key={email._id} style={{ cursor: "pointer" }} onClick={() => setShowCompose({ show: true, data: email })}>
                        <td>{email.to}</td>
                        <td>{email.subject}</td>
                        <td>
                            {new Date(email.sentAt).toLocaleDateString("en-GB")}
                        </td>
                        <td>
                            {new Date(email.sentAt).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                            })}
                        </td>
                        <td>
                            <span className="badge bg-success">
                                {email.status.toUpperCase()}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
