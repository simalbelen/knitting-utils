import { Input, Button, NumberInput, Checkbox, Textarea } from "@heroui/react";
import type { Section } from "../../types/Section";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import SectionService from "../../services/SectionService";

interface Props {
  onClose: () => void;
  projectId: string;
}

function AddSectionForm({ onClose, projectId }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const validationSchema = yup.object({
    title: yup.string().required("Campo obligatorio"),
    goal_row: yup.number().required("Campo obligatorio"),
    knit_flat: yup.boolean().required("Campo obligatorio"),
    right_side_even_row: yup.boolean().required("Campo obligatorio"),
    notes: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      notes: "",
      goal_row: undefined,
      knit_flat: false,
      right_side_even_row: true,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      if (values.goal_row === undefined) {
        toast.error("Tienes que introducir el número de vueltas");
        return;
      }
      try {
        await SectionService.createOne({
          project: projectId,
          title: values.title,
          notes: values.notes,
          goal_row: values.goal_row,
          knit_mode: {
            knit_flat: values.knit_flat,
            right_side_even_row: values.right_side_even_row,
          },
        } as Section);
        queryClient.invalidateQueries({ queryKey: ["sectionList"] });
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
      <NumberInput
        id="goal_row"
        label="Nº de vueltas"
        variant="bordered"
        hideStepper
        isWheelDisabled
        classNames={{
          label: "text-accent",
          inputWrapper: "border-accent",
        }}
        onValueChange={(newValue) => {
          formik.setFieldValue("goal_row", newValue);
        }}
        isInvalid={
          formik.touched.goal_row && formik.errors.goal_row ? true : false
        }
        errorMessage={formik.touched.goal_row && formik.errors.goal_row}
        value={formik.values.goal_row}
      />
      <div className="flex flex-col gap-2 border-2 border-accent rounded-xl p-2">
        <Checkbox
          isSelected={!formik.values.knit_flat}
          onChange={() => {
            formik.setFieldValue("knit_flat", false);
          }}
        >
          <span className="text-accent"> Tejido en redondo</span>
        </Checkbox>
        <Checkbox
          isSelected={formik.values.knit_flat}
          onChange={() => {
            formik.setFieldValue("knit_flat", true);
          }}
        >
          <span className="text-accent">Tejido en plano</span>
        </Checkbox>
        {formik.values.knit_flat && (
          <div className="ms-10 gap-2 flex flex-col">
            <span className="text-accent">Las vueltas del derecho son:</span>
            <Checkbox
              isSelected={formik.values.right_side_even_row}
              onChange={() => {
                formik.setFieldValue("right_side_even_row", true);
              }}
            >
              <span className="text-accent">Pares</span>
            </Checkbox>

            <Checkbox
              isSelected={!formik.values.right_side_even_row}
              onChange={() => {
                formik.setFieldValue("right_side_even_row", false);
              }}
            >
              <span className="text-accent">Impares</span>
            </Checkbox>
          </div>
        )}
      </div>
      <Textarea
        id="notes"
        label="Notas"
        variant="bordered"
        classNames={{
          label: "text-accent",
          inputWrapper: "border-accent",
        }}
        onValueChange={(value) => {
          formik.setFieldValue("notes", value);
        }}
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

export default AddSectionForm;
