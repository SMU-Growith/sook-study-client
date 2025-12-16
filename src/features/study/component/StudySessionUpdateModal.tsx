import { Modal } from "@/components/ui/Modal";
import CloseSvg from "@/assets/icons/close.svg";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/InputField";
import { useEffect, useState } from "react";
import { FormField } from "@/components/ui/FormField";
import { Form } from "@/components/ui/Form";
import {
  studySessionSchema,
  type TStudySessionSchema,
} from "../validators/study";

interface StudySessionUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (title: string) => void;
  currSessionId?: number;
  currTitle?: string;
}
export function StudySessionUpdateModal({
  isOpen,
  onClose,
  onConfirm,
  currSessionId,
  currTitle,
}: StudySessionUpdateModalProps) {
  const onSubmit = (values: TStudySessionSchema) => {
    onConfirm(values.title);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[550px]">
      <div className="flex flex-col text-left relative pt-4">
        <button onClick={onClose} className="absolute top-[-10px] right-0">
          <img src={CloseSvg} alt="닫기" className="w-6 h-6" />
        </button>
        <h3 className="heading-3 mb-2">스터디 일지 수정하기</h3>
        <hr className="border-t-3 border-gray-100 mb-[22px]" />
        <p className="text-gray-300 text-body-1-semibold mb-[22px]">
          {currSessionId}회차
        </p>
        <Form
          key={`${currSessionId}-${currTitle}`}
          schema={studySessionSchema}
          defaultValues={{ title: currTitle || "" }}
          onSubmit={onSubmit}
          className="w-full space-y-5"
        >
          <FormField name="title" label="스터디 일지" />
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
