import { Control, FieldErrors, RegisterOptions } from "react-hook-form"

export interface InputType {
    name: string;
    label: string;
    type?: string;
    control: Control<any>;
    required?: boolean;
    showEye?: boolean;
    errors?: FieldErrors;
    rules?: RegisterOptions
}