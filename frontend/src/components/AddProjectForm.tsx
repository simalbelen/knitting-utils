import { Input, Button } from "@heroui/react";
import ProjectService from "../services/ProjectService";
import type { Project } from "../types/Project";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  onClose: () => void;
}
function AddProjectForm({ onClose }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const createProject = async (project: Project) => {
    const { data } = await ProjectService.createOne(project);
    console.log(data);
  };

  const validationSchema = yup.object({
    title: yup.string().required("Campo obligatorio"),
    designer: yup.string().required("Campo obligatorio"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      designer: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        createProject({
          title: values.title,
          designer: values.designer,
        } as Project);
        queryClient.invalidateQueries({ queryKey: ["projectList"] });
        onClose();

        setLoading(false);
        toast.success("Proyecto creado");
      } catch (e: any) {
        console.log(e);
        setLoading(false);
        if (axios.isAxiosError(e)) {
          toast.error(e.response?.data.detail);
        } else {
          toast.error(e.data.details);
        }
        toast.error(e.data.details);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex gap-4 flex-col p-2 w-full"
    >
      <Input
        id="title"
        label="Título"
        type="test"
        variant="bordered"
        classNames={{
          label: "text-accent",
          inputWrapper: "border-accent",
        }}
        onChange={formik.handleChange}
        isInvalid={formik.touched.title && formik.errors.title ? true : false}
        errorMessage={formik.touched.title && formik.errors.title}
        value={formik.values.title.toString()}
      />
      <Input
        id="designer"
        label="Diseñador/a"
        type="test"
        variant="bordered"
        classNames={{
          label: "text-accent",
          inputWrapper: "border-accent",
        }}
        onChange={formik.handleChange}
        isInvalid={
          formik.touched.designer && formik.errors.designer ? true : false
        }
        errorMessage={formik.touched.designer && formik.errors.designer}
        value={formik.values.designer.toString()}
      />
      <div className="flex justify-end items-center gap-4">
        <Button
          variant="bordered"
          onPress={onClose}
          className="text-accent border-accent"
        >
          Cerrar
        </Button>
        <Button
          type="submit"
          className="text-tertiary bg-accent"
          isLoading={loading}
        >
          Guardar
        </Button>
      </div>
    </form>
  );
}

export default AddProjectForm;
