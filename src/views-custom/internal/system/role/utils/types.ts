interface RoleFormProps {
  id?: number | string;
  name: string;
  code: string;
  status: number; // 1: 正常, 0: 停用
  remark: string;
}

interface RoleSearchFormProps {
  name?: string;
  code?: string;
  status?: number | string;
}

export type { RoleFormProps, RoleSearchFormProps };
