// 雖然欄位很少 但是抽離出來 後續有擴充欄位需求就很方便了

interface FormItemProps {
  /** 角色名稱 */
  name: string;
  /** 角色編號 */
  code: string;
  /** 備註 */
  remark: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
