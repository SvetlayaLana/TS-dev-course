import { useForm } from 'react-hook-form';
import { createFormSchema, type CreateFormSchema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Priority, Status } from '../types';
import { addTask } from '../utils';
import { Input, Select } from '../components';
import { nanoid } from 'nanoid';

export const CreateTaskForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setError,
  } = useForm<CreateFormSchema>({
    defaultValues: {
      title: '',
      description: '',
      status: undefined,
      priority: undefined,
      deadline: undefined,
    },
    resolver: zodResolver(createFormSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: CreateFormSchema) => {
    try {
      await addTask({
        ...data,
        id: nanoid(),
        createdAt: new Date(),
      });
      reset();
    } catch (err) {
      setError('root', { message: 'Error during task creation' });
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 border border-gray-50 rounded-lg shadow-lg max-w-200 mx-auto"
    >
      <p className="font-bold text-lg mb-6">Create new task</p>
      <fieldset className="grid grid-cols-2 gap-4">
        <Input {...register('title')} label="Title" error={errors.title?.message} />
        <Input
          {...register('description')}
          label="Description"
          error={errors.description?.message}
        />
        <Select
          {...register('status')}
          label="Status"
          options={[
            { value: Status.TODO, label: 'to do' },
            { value: Status.IN_PROGRESS, label: 'in progress' },
            { value: Status.DONE, label: 'done' },
          ]}
          error={errors.status?.message}
        />
        <Select
          {...register('priority')}
          label="Priority"
          options={[
            { value: Priority.LOW, label: 'low' },
            { value: Priority.MEDIUM, label: 'medium' },
            { value: Priority.HIGH, label: 'high' },
          ]}
          error={errors.priority?.message}
        />
        <Input
          {...register('deadline')}
          type="date"
          label="Deadline"
          error={errors.deadline?.message}
        />
      </fieldset>
      <button
        type="submit"
        disabled={!isValid}
        className="w-full p-4 shadow-sm bg-sky-50 hover:bg-sky-50 hover:inset-shadow-sm
        rounded-lg cursor-pointer mt-6 uppercase font-semibold disabled:bg-gray-200 disabled:inset-shadow-none"
      >
        Create
      </button>
      {!!errors.root && (
        <p className="bg-red-50 text-red-800 px-4 py-2 mt-2 rounded-lg">{errors.root.message}</p>
      )}
    </form>
  );
};
