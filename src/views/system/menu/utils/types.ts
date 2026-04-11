interface FormItemProps {
  /** 選單類型（0代表選單、1代表iframe、2代表外鏈、3代表按鈕）*/
  menuType: number;
  higherMenuOptions: Record<string, unknown>[];
  parentId: number;
  title: string;
  name: string;
  path: string;
  component: string;
  rank: number;
  redirect: string;
  icon: string;
  extraIcon: string;
  enterTransition: string;
  leaveTransition: string;
  activePath: string;
  auths: string;
  frameSrc: string;
  frameLoading: boolean;
  keepAlive: boolean;
  hiddenTag: boolean;
  fixedTag: boolean;
  showLink: boolean;
  showParent: boolean;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
