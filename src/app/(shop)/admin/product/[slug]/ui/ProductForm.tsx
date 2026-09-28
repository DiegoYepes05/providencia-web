"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Category, Product, ProductImage as ProductWithImage } from "@/interfaces";
import { createUpdateProduct, deleteProductImage } from "@/actions";
import { ProductImage } from "@/components";
import { colorSlug, productColors } from "@/lib/product-colors";

interface Props {
  product: Partial<Product> & { ProductImage?: ProductWithImage[]; categoryId?: string };
  categories: Category[];
}

interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  tags: string;
  color: string;
  categoryId: string;
  motorW?: number;
  battery?: string;
  maxSpeed?: string;
  autonomy?: string;
  isActive: boolean;
}

interface PendingImage {
  id: string;
  file: File;
  preview: string;
}

export const ProductForm = ({ product, categories }: Props) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isNew = !product.id;

  const [savedImages, setSavedImages] = useState(product.ProductImage ?? []);
  const [pendingImages, setPendingImages] = useState<PendingImage[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const pendingImagesRef = useRef<PendingImage[]>([]);

  const {
    handleSubmit,
    register,
    formState: { isValid },
    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      title: product.title ?? "",
      slug: product.slug ?? "",
      description: product.description ?? "",
      price: product.price ?? 0,
      inStock: product.inStock ?? 1,
      tags: product.tags?.join(", ") ?? "",
      color: product.color ?? "Negro",
      categoryId: product.categoryId ?? "",
      motorW: product.motorW ?? undefined,
      battery: product.battery ?? undefined,
      maxSpeed: product.maxSpeed ?? undefined,
      autonomy: product.autonomy ?? undefined,
      isActive: product.isActive ?? true,
    },
  });

  const title = watch("title");
  const color = watch("color");

  useEffect(() => {
    setSavedImages(product.ProductImage ?? []);
  }, [product.ProductImage]);

  useEffect(() => {
    pendingImagesRef.current = pendingImages;
  }, [pendingImages]);

  useEffect(() => {
    return () => {
      pendingImagesRef.current.forEach((image) => URL.revokeObjectURL(image.preview));
    };
  }, []);

  const fillSlug = () => {
    if (!title || !color) return;
    setValue(
      "slug",
      `${title}-${colorSlug(color)}`.toLowerCase().replace(/ /g, "-"),
    );
  };

  const onFilesSelected = (files: FileList | null) => {
    if (!files?.length) return;

    const next = Array.from(files)
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => ({
        id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
        file,
        preview: URL.createObjectURL(file),
      }));

    setPendingImages((current) => [...current, ...next]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removePendingImage = (id: string) => {
    setPendingImages((current) => {
      const target = current.find((image) => image.id === id);
      if (target) URL.revokeObjectURL(target.preview);
      return current.filter((image) => image.id !== id);
    });
  };

  const onDeleteSavedImage = async (imageId: number, imageUrl: string) => {
    const resp = await deleteProductImage(imageId, imageUrl);

    if (!resp.ok) {
      toast.error(resp.message ?? "No se pudo eliminar");
      return;
    }

    setSavedImages((current) => current.filter((image) => image.id !== imageId));
    toast.success("Eliminado");
  };

  const onSubmit = async (data: FormInputs) => {
    setIsSaving(true);

    const formData = new FormData();

    if (product.id) {
      formData.append("id", product.id);
    }

    formData.append("title", data.title);
    formData.append("slug", data.slug);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("inStock", data.inStock.toString());
    formData.append("tags", data.tags ?? "");
    formData.append("categoryId", data.categoryId);
    formData.append("color", data.color);
    formData.append("motorW", String(data.motorW ?? 0));
    formData.append("battery", data.battery ?? "");
    formData.append("maxSpeed", data.maxSpeed ?? "");
    formData.append("autonomy", data.autonomy ?? "");
    formData.append("isActive", String(data.isActive));

    pendingImages.forEach((image) => {
      formData.append("images", image.file);
    });

    const { ok, product: updatedProduct } = await createUpdateProduct(formData);

    if (!ok || !updatedProduct) {
      setIsSaving(false);
      toast.error("No se pudo guardar el producto");
      return;
    }

    toast.success(isNew ? "Guardado" : "Actualizado");
    router.push(
      updatedProduct.isActive
        ? `/product/${updatedProduct.slug}`
        : "/admin/products",
    );
  };

  const hasImages = savedImages.length > 0 || pendingImages.length > 0;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-16 grid grid-cols-1 gap-3 px-5 sm:grid-cols-2 sm:px-0"
    >
      <div className="w-full">
        <Field label="Título">
          <input className="field-admin" {...register("title", { required: true })} />
        </Field>
        <Field label="Slug">
          <input
            className="field-admin"
            {...register("slug", { required: true })}
            onFocus={fillSlug}
          />
        </Field>
        <Field label="Descripción">
          <textarea
            rows={5}
            className="field-admin"
            {...register("description", { required: true })}
          />
        </Field>
        <Field label="Precio (COP)">
          <input
            type="number"
            className="field-admin"
            {...register("price", { required: true, min: 0 })}
          />
        </Field>
        <Field label="Tags">
          <input className="field-admin" {...register("tags")} />
        </Field>
        <Field label="Línea">
          <select
            className="field-admin"
            {...register("categoryId", { required: true })}
          >
            <option value="" className="bg-void text-white">
              [Seleccione]
            </option>
            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
                className="bg-void text-white"
              >
                {category.name}
              </option>
            ))}
          </select>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Motor (W)">
            <input type="number" className="field-admin" {...register("motorW")} />
          </Field>
          <Field label="Batería">
            <input className="field-admin" {...register("battery")} />
          </Field>
          <Field label="Velocidad">
            <input className="field-admin" {...register("maxSpeed")} />
          </Field>
          <Field label="Autonomía">
            <input className="field-admin" {...register("autonomy")} />
          </Field>
        </div>
        <button
          disabled={!isValid || isSaving}
          className={`mt-4 w-full ${!isValid || isSaving ? "btn-disabled" : "btn-primary"}`}
        >
          {isSaving ? "Guardando…" : "Guardar"}
        </button>
      </div>

      <div className="w-full">
        <Field label="Inventario">
          <input
            type="number"
            className="field-admin"
            {...register("inStock", { required: true, min: 0 })}
          />
        </Field>

        <label className="mb-6 flex cursor-pointer items-center justify-between rounded-2xl border border-white/10 bg-white/4 px-4 py-3">
          <span>
            <span className="block text-sm font-medium text-white">Producto activo</span>
            <span className="mt-0.5 block text-xs text-white/45">
              Si está desactivado, no aparece en la tienda ni en el inicio.
            </span>
          </span>
          <input
            type="checkbox"
            className="size-5 accent-brand-400"
            {...register("isActive")}
          />
        </label>

        <div className="mb-6">
          <span className="field-label">Color</span>
          <div className="flex flex-wrap gap-2">
            {productColors.map((item) => (
              <label
                key={item.name}
                className="flex cursor-pointer items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-sm text-white/70 has-checked:border-brand-400 has-checked:bg-brand-400 has-checked:text-void"
              >
                <input
                  type="radio"
                  value={item.name}
                  className="sr-only"
                  {...register("color", { required: true })}
                />
                <span
                  className="size-3.5 rounded-full border border-white/20"
                  style={{ backgroundColor: item.hex }}
                />
                {item.name}
              </label>
            ))}
          </div>
        </div>

        <div className="mb-5">
          <span className="field-label">Fotos</span>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/png,image/jpeg,image/avif,image/webp"
            className="sr-only"
            onChange={(event) => onFilesSelected(event.target.files)}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex w-full items-center justify-center rounded-2xl border border-dashed border-white/20 px-4 py-8 text-sm text-white/55 transition-colors hover:border-brand-400 hover:text-white"
          >
            Elegir imágenes
          </button>
          <p className="mt-2 text-xs text-white/35">
            Se ven aquí al momento. Se guardan al pulsar Guardar.
          </p>
        </div>

        {hasImages ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {savedImages.map((image) => (
              <div key={image.id} className="overflow-hidden rounded-2xl bg-panel">
                <div className="relative aspect-square bg-[#eceae4]">
                  <ProductImage
                    alt={product.title ?? ""}
                    src={image.url}
                    fill
                    className="object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => onDeleteSavedImage(image.id, image.url)}
                  className="w-full py-2 text-xs font-semibold tracking-[0.12em] text-red-400 uppercase hover:bg-white/5 hover:text-red-300"
                >
                  Eliminar
                </button>
              </div>
            ))}

            {pendingImages.map((image) => (
              <div key={image.id} className="overflow-hidden rounded-2xl bg-panel">
                {/* Preview local: blob URLs no pasan por next/image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.preview}
                  alt={image.file.name}
                  className="aspect-square w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removePendingImage(image.id)}
                  className="w-full py-2 text-xs font-semibold tracking-[0.12em] text-white/45 uppercase hover:bg-white/5 hover:text-white"
                >
                  Quitar
                </button>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </form>
  );
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-col">
      <span className="field-label">{label}</span>
      {children}
    </div>
  );
}
