import { Modal } from "@/components/ui/Modal";
import CloseSvg from "@/assets/icons/close.svg";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/InputField";
import { useRef, useState, type ChangeEvent } from "react";
import { FormField } from "@/components/ui/FormField";
import { Form } from "@/components/ui/Form";
import { studyLogSchema, type TStudyLogSchema } from "../validators/study";
import type { StudyLogDetail } from "../api/studyType";

interface StudyLogUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: TStudyLogSchema) => void;
  onDelete: (journalId: number) => void;
  sessionId: number;
  logDetail?: StudyLogDetail;
}
export function StudyLogUpdateModal({
  isOpen,
  onClose,
  onConfirm,
  onDelete,
  sessionId,
  logDetail,
}: StudyLogUpdateModalProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleClickAttachButton = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setSelectedFiles(filesArray);
    } else {
      setSelectedFiles([]);
    }
  };

  const onSubmit = (data: TStudyLogSchema) => {
    console.log("Study Log Form Data:", data);
    onConfirm(data);
  };

  const handleLogDelete = () => {
    if (logDetail && logDetail.journalId) {
      onDelete(logDetail.journalId);
    }
  };

  const fileNames =
    selectedFiles.length > 0
      ? selectedFiles.map((file) => file.name).join(", ")
      : "";

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[550px]">
      <div className="flex flex-col text-left relative pt-4">
        <button onClick={onClose} className="absolute top-[-10px] right-0">
          <img src={CloseSvg} alt="닫기" className="w-6 h-6" />
        </button>
        <div className="flex justify-between items-center mt-2 mb-2">
          <h3 className="heading-3 mb-2">스터디 일지 수정하기</h3>
          <Button variant="deleted" size="md" onClick={handleLogDelete}>
            삭제하기
          </Button>
        </div>
        <hr className="border-t-3 border-gray-100 mb-[22px]" />
        <Form
          schema={studyLogSchema}
          onSubmit={onSubmit}
          defaultValues={logDetail}
        >
          <p className="text-gray-300 text-body-1-semibold mb-[22px]">
            {sessionId}회차
          </p>
          <div className="flex flex-col gap-4">
            <FormField
              name="content"
              label="스터디 내용"
              placeholder="이번 주차에 어떤 스터디를 했는지 작성해주세요."
              type="textarea"
            />
            <FormField
              name="url"
              label="링크"
              placeholder="따로 정리한 링크가 있다면 첨부해주세요."
            />
            <input
              type="file"
              multiple
              accept=".png,.jpg,.jpeg,application/pdf"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
            {/* <div className="flex gap-[10px] items-end">
            <div className="grow">
              <InputField
                label="첨부파일"
                placeholder="사진 및 파일을 첨부해주세요."
                value={fileNames}
                readOnly
              />
            </div>
            <Button variant="solid" size="md" onClick={handleClickAttachButton}>
              파일첨부
            </Button>
          </div>
          <p className="text-body-2-semibold text-gray-300">
            {" "}
            ⦁ 이미지 (png,jpeg)는 최대 10장까지 가능해요.
            <br /> ⦁ PDF는 최대 30MB까지 가능해요.
          </p> */}
          </div>
          <div className="flex gap-[10px] mt-[12px] mb-[12px]">
            <Button variant="default" onClick={onClose}>
              닫기
            </Button>
            <Button variant="primary" className="flex-1" type="submit">
              수정하기
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
}
