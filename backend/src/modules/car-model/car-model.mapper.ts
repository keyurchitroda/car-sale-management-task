import { env } from "../../config/env";
import { decrypt, encrypt } from "../../utils/encryption";

export const toCarModelEntity = (dto: any) => ({
  brand: dto.brand,
  class: dto.class,

  model_name: dto.modelName,
  model_code: dto.modelCode,

  description: encrypt(dto.description),
  features: encrypt(dto.features),

  price: dto.price,
  date_of_manufacturing: dto.dateOfManufacturing,

  active: dto.active ?? true,
  sort_order: dto.sortOrder ?? 0,

  images: dto.images,
  default_image: dto.images?.[0],
});

export const toCarModelDTO = (row: any) => ({
  id: row.id,
  brand: row.brand,
  class: row.class,

  modelName: row.model_name,
  modelCode: row.model_code,

  description: decrypt(row.description),
  features: decrypt(row.features),

  price: row.price,
  dateOfManufacturing: row.date_of_manufacturing,

  active: row.active,
  sortOrder: row.sort_order,

  images: row.images?.map(
    (img: string) => `http://localhost:${env.PORT}/uploads/${img}`
  ),
  thumbnail: row.default_image
    ? `http://localhost:${env.PORT}/uploads/${row.default_image}`
    : null,

  createdAt: row.created_at,
});
