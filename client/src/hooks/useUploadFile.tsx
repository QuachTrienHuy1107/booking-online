import { message } from "antd";
import React, { ChangeEvent } from "react";

const getBase64 = (file: Blob, callback: Function) => {
    return new Promise((resolve, rejects) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(callback(reader.result));
        reader.onerror = (error) => rejects(error);
    });
};

const validateUploadFile = (file: File) => {
    if (file) {
        const { type: fileType, size: fileSize } = file;

        const allowExtension = ["jpg", "png", "svg", "jpeg"];
        const allowSize = fileSize / 1024 / 1024 < 2;

        const fileExtension = fileType?.split("/").pop() as string;

        if (!allowExtension.includes(fileExtension)) {
            message.error("You can only upload JPG/PNG file!");
            return false;
        } else if (!allowSize) {
            message.error("Image must smaller than 2MB!");
            return false;
        } else {
            return true;
        }
    }
};

export const useUpload = () => {
    const [avatar, setAvatar] = React.useState<File>();
    const [preview, setPreview] = React.useState<string | any>("");
    const [loading, setLoading] = React.useState(false);

    const handleFileChange = (_file: any) => {
        if (!_file) return;
        const { file } = _file;
        if (validateUploadFile(file)) {
            getBase64(file, (imgUrl: any) => {
                setPreview(imgUrl);
            });
            setAvatar(file);
        }
    };

    return { avatar, handleFileChange, preview, loading };
};
