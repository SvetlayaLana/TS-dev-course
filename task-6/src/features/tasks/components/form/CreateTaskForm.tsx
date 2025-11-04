import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { createFormSchema, type CreateFormSchema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Priority, Status } from '../../types';
import { addTask } from '../../api';
import { Input, Select } from '../../../../shared/components';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';

export const CreateTaskForm: FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
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
      navigate('/tasks');
    } catch (err) {
      if (err instanceof Error) {
        console.log('Error: ', err.message);
      }
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="max-w-150 mx-auto">
      <p className="font-semibold text-3xl mb-4">Create new task</p>
      <fieldset className="grid grid-cols-2 gap-4">
        <Input
          {...register('title')}
          label="Title"
          error={errors.title?.message}
          className="col-span-full"
        />
        <Input
          {...register('description')}
          label="Description"
          error={errors.description?.message}
          className="col-span-full"
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
        className="w-full p-4 bg-fuchsia-700 hover:bg-fuchsia-800 text-white rounded-2xl
        cursor-pointer mt-6 uppercase font-semibold disabled:bg-gray-300"
      >
        Create
      </button>
    </form>
  );
};
