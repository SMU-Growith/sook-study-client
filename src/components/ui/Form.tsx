import {
  useForm,
  FormProvider,
  type FieldValues,
  type UseFormProps,
  type SubmitHandler,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type z } from 'zod';

type FormProps<T extends FieldValues> = Omit<UseFormProps<T>, 'resolver'> & {
  schema: z.ZodType<T, any, any>;
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
  className?: string;
};

export function Form<T extends FieldValues>({
  schema,
  onSubmit,
  children,
  className,
  ...props
}: FormProps<T>) {
  const { mode, defaultValues, reValidateMode, ...rest } = props;
  const methods = useForm<T>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues,
    reValidateMode,
    ...rest,
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormProvider>
  );
}
