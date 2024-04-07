import { zfd } from "zod-form-data";
import { z } from "zod";

const uploadFileSchema = zfd.formData({
    file: zfd.file(),
});

export function validateUploadFileFormData(formData: FormData) {
    return uploadFileSchema.parse(formData);
}
