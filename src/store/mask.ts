export interface IItems {
  title: string;
  countView: string;
  countPlay: string;
  countSend: string;
  countOrder: string;
  countPay: string;
  viewSend: string;
  viewPay: string;
  children?: Array<IItems>;
  collapseId?: string;
  parentId?: string;
  collapseHide?: boolean;
  classes?: string;
}
export interface TableColProps {
  is?: "th" | "td";
}
export interface RowColProps extends TableColProps {
  text: string;
  attr?: any;
}

export const HEADER_COLS: Array<RowColProps> = [
  {
    text: "Категория",
    is: "th",
    attr: {
      scope: "col",
      colspan: "4",
      class: "text-start",
    },
  },
  {
    text: '<i class="bi bi-eyeglasses"></i>',
    is: "th",
    attr: {
      scope: "col",
    },
  },
  {
    text: '<i class="bi bi-caret-right-fill"></i>',
    is: "th",
    attr: {
      scope: "col",
    },
  },
  {
    text: '<i class="bi bi-arrow-up"></i>',
    is: "th",
    attr: {
      scope: "col",
    },
  },
  {
    text: '<i class="bi bi-box-arrow-up">',
    is: "th",
    attr: {
      scope: "col",
    },
  },
  {
    text: '<i class="bi bi-credit-card"></i>',
    is: "th",
    attr: {
      scope: "col",
    },
  },
  {
    text: '<i class="bi bi-eyeglasses"></i>/<i class="bi bi-arrow-up-square"></i>',
    is: "th",
    attr: {
      scope: "col",
    },
  },
  {
    text: '<i class="bi bi-eyeglasses"></i>/<i class="bi bi-credit-card"></i>',
    is: "th",
    attr: {
      scope: "col",
    },
  },
];
