// 错误信息
export interface Err {
    timestamp?: Date;
    status?:    string;
    error?:     string;
    exception?: string;
    message?:   string;
    path?:      string;
}
