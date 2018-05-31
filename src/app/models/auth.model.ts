import { Err } from './err.model';
import { User } from './user.model';
// 认证
export interface Auth {
    user?:      User;
    userId?:    string;
    token?:     string;
    err?:        Err;
}
