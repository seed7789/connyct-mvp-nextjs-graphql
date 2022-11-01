import get from 'lodash.get';
import { DeepMap, FieldError, UseFormRegister, Path } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { classNames } from '@/utils/classnames';
import { RadioProps } from '@/components/atoms/forms';
import { FormRadio } from '@/components/molecules/forms';
import { FormErrorMessage } from '../form-error-message';

export type FormRadioProps<TFormValues> = {
	name: Path<TFormValues>;
	label?: string | React.ReactNode;
	helperText?: string | React.ReactNode;
	errors?: Partial<DeepMap<TFormValues, FieldError>>;
	inputClassName?: string;
	register?: UseFormRegister<TFormValues>;
} & Omit<RadioProps, 'name'>;

export const FormRadioField = <TFormValues extends Record<string, unknown>>({
	id,
	name,
	label,
	helperText,
	errors,
	register,
	className,
	inputClassName,
	...props
}: FormRadioProps<TFormValues>): JSX.Element => {
	const errorMessages = get(errors, name);
	const hasError = !!(errors && errorMessages);
	return (
		<>
			<FormRadio
				id={id}
				name={name}
				label={label}
				helperText={helperText}
				aria-invalid={hasError}
				className={classNames({ '': hasError }, inputClassName)}
				{...props}
				{...(register && register(name))}
			/>
			<ErrorMessage
				errors={errors}
				name={name as any}
				render={({ message }) => <FormErrorMessage className='mt-1'>{message}</FormErrorMessage>}
			/>
		</>
	);
};
