"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function DraggableButton() {
    return (
        <div className="relative bg-background w-full h-screen overflow-hidden">
            <motion.div
                drag
                dragMomentum={false}
                dragConstraints={{
                    top: 0,
                    left: 0,
                    right: window ? window.innerWidth - 100 : 0, // Adjust based on button width
                    bottom: window ? window.innerHeight - 40 : 0, // Adjust based on button height
                }}
                className="top-1/2 left-1/2 absolute cursor-grab active:cursor-grabbing"
                whileDrag={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <Button>Drag me anywhere!</Button>
            </motion.div>
        </div>
    )
}

