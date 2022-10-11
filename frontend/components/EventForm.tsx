import React, { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { mixed, object, SchemaOf, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import Input from "./Input";
import ErrorMessage from "./ErrorMessage";
import { Event, EventResponse, ImageResponse } from "@tstypes/Event";
import { FormFields } from "@tstypes/FormFields";
import { PROXY_API } from "@config";
import { fetchData } from "@utils/helper";

type PageProps = {
  evt: Event | null;
  token: string | undefined;
};

const SUPPORTED_FORMATS = ["image/jpeg", "image/jpg", "image/png"];

const schema: SchemaOf<FormFields> = object({
  name: string().defined().required("Please provide a valid name of event."),
  slug: string().defined().nullable(),
  performers: string().defined().required("Please provide a valid name of perfomers."),
  venue: string().defined().required("Please provide a valid venue."),
  address: string().defined().required("Please provide a valid address."),
  date: string().defined().required("Please provide a valid date of event."),
  time: string().defined().required("Please provide a valid time of event."),
  description: string().defined().required("Please provide some description."),
  image: mixed()
    .notRequired()
    .test("fileFormat", "Please provide a supported file type", (files) => !files.length || (files && SUPPORTED_FORMATS.includes(files[0].type))),
});

export default function EventForm({ evt, token }: PageProps) {
  const router = useRouter();
  const {
    register,
    formState: { errors, isValid, isSubmitting },
    reset,
    handleSubmit,
    setFocus,
  } = useForm<FormFields>({
    defaultValues: {
      name: evt?.attributes.name ?? "",
      slug: evt?.attributes.slug ?? "",
      performers: evt?.attributes.performers ?? "",
      venue: evt?.attributes.venue ?? "",
      address: evt?.attributes.address ?? "",
      date: dayjs(evt?.attributes.date ?? "").format("YYYY-MM-DD"),
      time: evt?.attributes.time ?? "",
      description: evt?.attributes.description ?? "",
    },
    reValidateMode: "onSubmit",
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const [editMode, setEditMode] = useState(!!router.query.id);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (router.query.id) {
      setEditMode(true);
    }

    setFocus("name");
  }, [router.query.id, setFocus]);

  const onSelectButtonClicked = (e: MouseEvent<HTMLButtonElement>) => {
    fileInputRef.current?.click();
  };

  const onFileChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return false;

    setFile(files[0]);
  };

  const onSubmit: SubmitHandler<FormFields> = async (values) => {
    const fields = await uploadImageFile(file as File, values);

    if (editMode && evt) {
      await updateEvent(fields);
      return false;
    }

    await createEvent(fields);
  };

  const createEvent = async (values: FormFields) => {
    try {
      const { data } = await fetchData<EventResponse>(`${PROXY_API}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: values }),
      });

      reset();
      router.push(`/events/${data.attributes.slug}`);
      toast("Added event.", {
        toastId: "toast-info",
      });
    } catch (error) {
      toast("Failed to add event.", {
        toastId: "toast-info",
      });
    }
  };

  const updateEvent = async (values: FormFields) => {
    try {
      const { data } = await fetchData<EventResponse>(`${PROXY_API}/events/${evt?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: values }),
      });

      reset();
      router.push(`/events/${data.attributes.slug}`);
      toast("Edited event.", {
        toastId: "toast-info",
      });
    } catch (error) {
      toast("Failed to edit event.", {
        toastId: "toast-info",
      });
    }
  };

  const uploadImageFile = async (image: File, values: FormFields) => {
    if (!image) {
      const { image, ...newValues } = values;
      return newValues;
    }

    const formData = new FormData();
    formData.append("files", image);

    const files = await fetchData<[ImageResponse]>(`${PROXY_API}/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    return {
      ...values,
      image: files[0].id as string,
    };
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-x-20 gap-y-10">
        <div className="col-span-1">
          <Input<FormFields> type="text" name="name" placeholder="Name of Event" register={register} />
          <ErrorMessage error={errors.name} message={errors.name?.message} />
        </div>

        <div className="col-span-1">
          <Input<FormFields> type="text" name="performers" placeholder="Name of Performers" register={register} />
          <ErrorMessage error={errors.performers} message={errors.performers?.message} />
        </div>

        <div className="col-span-1">
          <Input type="text" name="venue" placeholder="Venue" register={register} />
          <ErrorMessage error={errors.venue} message={errors.venue?.message} />
        </div>

        <div className="col-span-1 ">
          <Input<FormFields> type="text" name="address" placeholder="Address" register={register} />
          <ErrorMessage error={errors.address} message={errors.address?.message} />
        </div>

        <div className="col-span-1">
          <Input<FormFields> type="date" name="date" placeholder="Date of Event" register={register} />
          <ErrorMessage error={errors.date} message={errors.date?.message} />
        </div>

        <div className="col-span-1">
          <Input<FormFields> type="text" name="time" placeholder="Time of Event" register={register} />
          <ErrorMessage error={errors.time} message={errors.time?.message} />
        </div>

        <div className="col-span-2">
          <Input<FormFields> type="textarea" name="description" placeholder="Event Description..." register={register} />
          <ErrorMessage error={errors.description} message={errors.description?.message} />
        </div>

        <div className="col-span-2">
          <Input<FormFields>
            type="file"
            name="image"
            register={register}
            inputFile={file}
            fileInputRef={fileInputRef}
            handleFileChanged={onFileChanged}
            handleSelectButtonClicked={onSelectButtonClicked}
          />
          <ErrorMessage error={errors.image} message={errors.image?.message} />
        </div>

        <button
          className="col-span-2 text-xl font-lato uppercase border border-black px-4 py-2 transition ease-in-out duration-150 hover:bg-black hover:text-white disabled:text-gray-500 disabled:bg-gray-100"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          {editMode ? "Edit Event" : "Add Event"}
        </button>
      </div>
    </form>
  );
}
