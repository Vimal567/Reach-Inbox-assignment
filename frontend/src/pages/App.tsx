import { useEffect, useState } from "react";
import { getMe, getScheduledEmails, getSentEmails } from "../services/api";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import ComposeModal from "../components/ComposeModal";
import ScheduledTable from "../components/ScheduledTable";
import SentTable from "../components/SentTable";


export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("scheduled");
  const [showCompose, setShowCompose] = useState({ show: false, data: null });
  const [scheduled, setScheduled] = useState<any[]>([]);
  const [sent, setSent] = useState<any[]>([]);

  useEffect(() => {
    getMe().then((res) => {
      setUser(res?.user ?? null);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (activeTab === "scheduled") {
      getScheduledEmails().then(setScheduled);
    } else {
      getSentEmails().then(setSent);
    }
  }, [activeTab]);


  if (loading) {
    return <div className="container vh-100 d-flex justify-content-center align-items-center">Loading may take upto one minute...</div>
  };

  if (!user) {
    return (
      <div className="container vh-100 d-flex justify-content-center align-items-center">
        <div className="card">
          <div className="card-body text-center gap-2">
            <h3>Reach Inbox Email Scheduler</h3>
            <h4 className="lead">Click to login using your google account</h4>
            <a className="btn btn-danger mt-3" href="https://reach-inbox-assignment-syvt.onrender.com/auth/google">
              Google ✉︎
            </a>
          </div>
        </div>
      </div>
    );

  }

  return (
    <>
      <Header user={user} />

      <div className="px-4 mt-4 text-end">
        <button className="btn btn-primary mb-3" onClick={() => setShowCompose({ show: true, data: null })}>
          Compose New Email
        </button>
      </div>

      <Tabs active={activeTab} onChange={setActiveTab} />

      <div className="container mt-4">
        {activeTab === "scheduled" && <ScheduledTable data={scheduled} setShowCompose={setShowCompose} />}
        {activeTab === "sent" && <SentTable data={sent} setShowCompose={setShowCompose} />}
      </div>

      {showCompose.show && (
        <ComposeModal
          onClose={() => { getScheduledEmails().then(setScheduled); setShowCompose({ show: false, data: null }) }}
          onSuccess={() => { }}
          email={showCompose.data}
        />
      )}
    </>
  );
}
