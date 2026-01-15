type Props = {
  active: string;
  onChange: (tab: string) => void;
};

export default function Tabs({ active, onChange }: Props) {
  return (
    <ul className="nav nav-tabs mt-3 px-4">
      {["scheduled", "sent"].map((tab) => (
        <li className="nav-item" key={tab}>
          <button
            className={`nav-link ${active === tab ? "active" : ""}`}
            onClick={() => onChange(tab)}
          >
            {tab === "scheduled" ? "Scheduled Emails" : "Sent Emails"}
          </button>
        </li>
      ))}
    </ul>
  );
}
