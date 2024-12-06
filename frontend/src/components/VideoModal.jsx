import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";

export function VideoModal({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] p-0">
        <div className="w-[700px] h-[391px]">
          <iframe
            src="https://www.youtube.com/embed/XTESYoky-j8"
            width="700"
            height="391"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
}
