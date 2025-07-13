import { Input, Button, NumberInput, Select, SelectItem } from "@heroui/react";
import ProjectService from "../services/ProjectService";
import type { Project } from "../types/Project";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { NEEDLE_SIZES } from "../types/Enumerations";

interface Props {
  onClose: () => void;
  project: Project;
}
function EditProjectForm({ onClose, project }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const validationSchema = yup.object({
    title: yup.string().required("Campo obligatorio"),
    designer: yup.string().required("Campo obligatorio"),
    needle: yup.string().required("Campo obligatorio"),
    stitches: yup.number(),
    rows: yup.number(),
  });

  const formik = useFormik({
    initialValues: {
      title: project.title,
      designer: project.designer,
      needle: project.gauge.needle,
      stitches: project.gauge.stitches ?? undefined,
      rows: project.gauge.rows ?? undefined,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      if (values.needle === undefined) {
        toast.error("Tienes que introducir el número de agujas");
        return;
      }
      if (project._id === undefined) {
        toast.error("El id del proyecto no está definido");
        return;
      }
      try {
        let stitches = {};

        if (values.stitches != undefined) {
          stitches = { stitches: values.stitches };
        }
        let rows = {};
        if (values.rows != undefined) {
          rows = { rows: values.rows };
        }
        const gauge = {
          gauge: {
            needle: values.needle,
            ...stitches,
            ...rows,
          },
        };
        await ProjectService.updateOne(project._id, {
          title: values.title,
          designer: values.designer,
          status: "created",
          ...gauge,
        } as Project);
        queryClient.invalidateQueries({ queryKey: ["projectList"] });
        onClose();

        setLoading(false);
        toast.success("Proyecto creado");
      } catch (e: any) {
        toast.error("Ha ocurrido un error al crear el proyecto");
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
      <div className="flex gap-4">
        <Select
          id="needle"
          label="Nº de agujas"
          selectionMode="single"
          variant="bordered"
          className="max-w text-accent"
          classNames={{
            label: "text-accent",
            listbox: "bg-tertiary",
            popoverContent: "bg-tertiary",
          }}
          size="lg"
          value={formik.values.needle}
          onChange={(e) => {
            formik.setFieldValue("needle", e.target.value);
          }}
          onBlur={() => {
            formik.setTouched({ ...formik.touched, needle: true });
          }}
          selectedKeys={
            formik.values.needle ? [formik.values.needle] : undefined
          }
          isOpen={isOpen}
          onOpenChange={(open) => open !== isOpen && setIsOpen(open)}
          isInvalid={
            !isOpen && formik.touched.needle && formik.errors.needle
              ? true
              : false
          }
          errorMessage={formik.touched.needle && formik.errors.needle}
        >
          {NEEDLE_SIZES.map((size: string) => {
            return <SelectItem key={size} title={size} />;
          })}
        </Select>
        <div className="border-2 border-accent rounded-2xl flex gap-4 text-xl justify-center items-center px-4">
          <NumberInput
            id="stitches"
            label="Puntos"
            variant="underlined"
            hideStepper
            isWheelDisabled
            classNames={{
              label: "text-accent",
              inputWrapper: "border-accent",
            }}
            onValueChange={(newValue) => {
              formik.setFieldValue("stitches", newValue);
            }}
            isInvalid={
              formik.touched.stitches && formik.errors.stitches ? true : false
            }
            errorMessage={formik.touched.stitches && formik.errors.stitches}
            value={formik.values.stitches}
          />
          <span>x</span>
          <NumberInput
            id="rows"
            label="Vueltas"
            hideStepper
            isWheelDisabled
            variant="underlined"
            classNames={{
              label: "text-accent",
              inputWrapper: "border-accent",
            }}
            onValueChange={(newValue) => {
              formik.setFieldValue("rows", newValue);
            }}
            isInvalid={formik.touched.rows && formik.errors.rows ? true : false}
            errorMessage={formik.touched.rows && formik.errors.rows}
            value={formik.values.rows}
          />
        </div>
      </div>

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

export default EditProjectForm;
