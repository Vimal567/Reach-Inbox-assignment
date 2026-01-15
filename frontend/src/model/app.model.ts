export interface Props {
    data?: any,
    setShowCompose?: any,
    email?: any,
    onClose?: any,
    onSuccess?: any,
    user?: any
}

export interface Email {
    _id: any;
    to: String;
    subject: String;
    body: String;
    scheduledAt: Date;
    status: String;
    sentAt: Date;
}