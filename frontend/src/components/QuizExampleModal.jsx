import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";

export function QuizExampleModal({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1288px] p-0">
        <div className="w-[1288px] h-[545px]">
          <img
            src="https://talent24.ai/quiz_generation.png"
            alt="AI-powered Quiz Generation"
            className="w-full h-full object-cover"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
