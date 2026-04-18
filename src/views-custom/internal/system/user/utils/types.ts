interface UserFormProps {
  id?: number | string;
  username: string;
  nickname: string;
  password?: string;
  phone: string;
  email: string;
  sex: string; // "1" 代表男，"0" 代表女
  deptId?: string | number;
  status: number; // 1: 正常, 0: 停用
  remark: string;
}

interface UserSearchFormProps {
  username?: string;
  phone?: string;
  status?: number | string;
}

export type { UserFormProps, UserSearchFormProps };
