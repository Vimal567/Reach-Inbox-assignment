import { Props } from "../model/app.model";

export default function Header({ user }: Props) {
  return (
    <nav className="navbar navbar-light bg-light px-4">
      <span className="navbar-brand" style={{fontFamily: 'cursive'}}>Reach Inbox</span>

      <div className="d-flex align-items-center gap-3">
        {user.photos[0].value ? (
          <img
            src={user.photos?.[0]?.value}
            alt="avatar"
            width={32}
            height={32}
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
            onError={e => {
              e.currentTarget.src = "/logo.png";
            }}
            style={{ borderRadius: "50%" }}
          />

        ) : null}
        <div>
          <div style={{ fontSize: 14 }}>{user.displayName}</div>
          <div style={{ fontSize: 12, color: "#666" }}>
            {user.emails?.[0]?.value}
          </div>
        </div>
        <a
          href="https://reach-inbox-assignment-syvt.onrender.com/auth/logout"
          className="btn btn-outline-secondary btn-sm"
        >
          Logout
        </a>
      </div>
    </nav>
  );
}
