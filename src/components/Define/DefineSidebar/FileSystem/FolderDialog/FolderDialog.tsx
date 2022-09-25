import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import SaveCancelButtons from "components/_UI/Buttons/SaveCancelButtons";
import MyTextField from "components/_UI/MyInputs/MyTextField";
import useSaveFolderMutation from "hooks/react-query/folders/useSaveFolderMutation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import FolderDto from "types/domain/folder/FolderDto";

const FolderDialog = (props: {
  open: boolean;
  initialValue: FolderDto;
  onClose: () => void;
}) => {
  const { mutate, isLoading } = useSaveFolderMutation();

  const {
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<FolderDto>({
    defaultValues: props.initialValue,
  });

  useEffect(() => {
    if (props.open && props.initialValue) reset(props.initialValue);
  }, [props.open, props.initialValue]);

  const onSubmit = (formData: FolderDto) => {
    mutate(formData, {
      onSuccess: props.onClose,
    });
  };

  return (
    <Dialog
      onClose={props.onClose}
      open={props.open}
      fullWidth
      maxWidth="xs"
      aria-labelledby="folder-dialog"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="folder-dialog-title">
          {watch("id") ? "Edit folder" : "New folder"}
        </DialogTitle>
        <DialogContent>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <MyTextField
                id="name"
                {...field}
                required
                size="small"
                label="Folder name"
                className="mt-3"
                fullWidth
                autoFocus
              />
            )}
          />
        </DialogContent>
        <DialogTitle>
          <SaveCancelButtons disabled={isLoading} onCancel={props.onClose} />
        </DialogTitle>
      </form>
    </Dialog>
  );
};

export default FolderDialog;
