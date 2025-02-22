"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Toggle } from "@/components/ui/toggle"
import { X, Move, Type, ScanEye, Bold, Italic, Underline, Upload, Settings2, Info } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { HexColorPicker } from "react-colorful"
import { motion } from "framer-motion"
import { useDropzone } from "react-dropzone"
import { GridPattern } from "@/components/ui/file-upload"

interface TextPosition {
    id: number
    x: number
    y: number
    text: string
    size: number
    rotation: number
    color: string
    font: string
    bold: boolean
    italic: boolean
    underline: boolean
    opacity: number
}

const fonts = [
    "Arial",
    "Helvetica",
    "Times New Roman",
    "Courier",
    "Verdana",
    "Georgia",
    "Palatino",
    "Garamond",
    "Bookman",
    "Comic Sans MS",
    "Trebuchet MS",
    "Arial Black",
    "Impact",
]

export default function MemeGenerator() {
    const [image, setImage] = useState<string | null>(null)
    const [text, setText] = useState("")
    const [textPositions, setTextPositions] = useState<TextPosition[]>([])
    const [selectedTextId, setSelectedTextId] = useState<number | null>(null)
    const [nextId, setNextId] = useState(0)
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })
    const [isDragging, setIsDragging] = useState(false)
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e: ProgressEvent<FileReader>) => {
                const result = e.target?.result
                if (typeof result === "string") {
                    const img = new Image()
                    img.onload = () => {
                        setCanvasSize({ width: img.width, height: img.height })
                        setImage(result)
                    }
                    img.src = result
                }
            }
            reader.readAsDataURL(file)
        }
    }, [])

    const [addTextState, setAddTextState] = useState(true)
    const [previewState, setPreviewState] = useState(false)

    const handleCanvasClick = useCallback(
        (e: React.MouseEvent<HTMLCanvasElement>) => {
            const canvas = canvasRef.current
            if (canvas) {
                const rect = canvas.getBoundingClientRect()
                const x = (e.clientX - rect.left) * (canvas.width / rect.width)
                const y = (e.clientY - rect.top) * (canvas.height / rect.height)

                if (text && addTextState) {
                    const newText: TextPosition = {
                        id: nextId,
                        x,
                        y,
                        text,
                        size: 80,
                        rotation: 0,
                        color: "#000000",
                        font: "Arial",
                        bold: false,
                        italic: false,
                        underline: false,
                        opacity: 1,
                    }
                    setTextPositions((prev) => [...prev, newText])
                    setSelectedTextId(nextId)
                    setNextId((prevId) => prevId + 1)
                    setText("")
                } else {
                    setSelectedTextId(null)
                }
            }
        },
        [text, addTextState, nextId],
    )

    const removeText = useCallback((e: React.MouseEvent, id: number) => {
        e.stopPropagation()
        setTextPositions((prev) => prev.filter((pos) => pos.id !== id))
        setSelectedTextId(null)
    }, [])

    const updateTextPosition = useCallback((id: number, x: number, y: number) => {
        setTextPositions((prev) => prev.map((pos) => (pos.id === id ? { ...pos, x, y } : pos)))
    }, [])

    const handleDragStart = useCallback(
        (e: React.MouseEvent, id: number) => {
            e.stopPropagation()
            const canvas = canvasRef.current
            if (canvas) {
                const rect = canvas.getBoundingClientRect()
                const x = (e.clientX - rect.left) * (canvas.width / rect.width)
                const y = (e.clientY - rect.top) * (canvas.height / rect.height)
                const textPos = textPositions.find((pos) => pos.id === id)
                if (textPos) {
                    setDragOffset({
                        x: textPos.x - x,
                        y: textPos.y - y,
                    })
                }
            }
            setIsDragging(true)
            setSelectedTextId(id)
        },
        [textPositions],
    )

    const handleDrag = useCallback(
        (e: React.MouseEvent) => {
            if (isDragging && selectedTextId !== null) {
                const canvas = canvasRef.current
                if (canvas) {
                    const rect = canvas.getBoundingClientRect()
                    const x = (e.clientX - rect.left) * (canvas.width / rect.width) + dragOffset.x
                    const y = (e.clientY - rect.top) * (canvas.height / rect.height) + dragOffset.y
                    updateTextPosition(selectedTextId, x, y)
                }
            }
        },
        [isDragging, selectedTextId, updateTextPosition, dragOffset],
    )

    const handleDragEnd = useCallback(() => {
        setIsDragging(false)
    }, [])

    const handleTouchStart = useCallback(
        (e: React.TouchEvent, id: number) => {
            const touch = e.touches[0]
            const canvas = canvasRef.current
            if (canvas) {
                const rect = canvas.getBoundingClientRect()
                const x = (touch.clientX - rect.left) * (canvas.width / rect.width)
                const y = (touch.clientY - rect.top) * (canvas.height / rect.height)
                const textPos = textPositions.find((pos) => pos.id === id)
                if (textPos) {
                    setDragOffset({
                        x: textPos.x - x,
                        y: textPos.y - y,
                    })
                }
            }
            setIsDragging(true)
            setSelectedTextId(id)
        },
        [textPositions],
    )

    const handleTouchMove = useCallback(
        (e: React.TouchEvent) => {
            if (isDragging && selectedTextId !== null) {
                const touch = e.touches[0]
                const canvas = canvasRef.current
                if (canvas) {
                    const rect = canvas.getBoundingClientRect()
                    const x = (touch.clientX - rect.left) * (canvas.width / rect.width) + dragOffset.x
                    const y = (touch.clientY - rect.top) * (canvas.height / rect.height) + dragOffset.y
                    updateTextPosition(selectedTextId, x, y)
                }
            }
        },
        [isDragging, selectedTextId, updateTextPosition, dragOffset],
    )

    const handleTouchEnd = useCallback(() => {
        setIsDragging(false)
    }, [])

    const handleTextSizeChange = useCallback(
        (value: number) => {
            if (selectedTextId !== null) {
                setTextPositions((prev) => prev.map((pos) => (pos.id === selectedTextId ? { ...pos, size: value } : pos)))
            }
        },
        [selectedTextId],
    )

    const handleTextRotationChange = useCallback(
        (value: number) => {
            if (selectedTextId !== null) {
                setTextPositions((prev) => prev.map((pos) => (pos.id === selectedTextId ? { ...pos, rotation: value } : pos)))
            }
        },
        [selectedTextId],
    )

    const handleTextColorChange = useCallback(
        (color: string) => {
            if (selectedTextId !== null) {
                setTextPositions((prev) => prev.map((pos) => (pos.id === selectedTextId ? { ...pos, color: color } : pos)))
            }
        },
        [selectedTextId],
    )

    const handleTextFontChange = useCallback(
        (font: string) => {
            if (selectedTextId !== null) {
                setTextPositions((prev) => prev.map((pos) => (pos.id === selectedTextId ? { ...pos, font: font } : pos)))
            }
        },
        [selectedTextId],
    )

    const handleTextStyleChange = useCallback(
        (style: "bold" | "italic" | "underline") => {
            if (selectedTextId !== null) {
                setTextPositions((prev) =>
                    prev.map((pos) => (pos.id === selectedTextId ? { ...pos, [style]: !pos[style] } : pos)),
                )
            }
        },
        [selectedTextId],
    )

    const handleTextOpacityChange = useCallback(
        (value: number) => {
            if (selectedTextId !== null) {
                setTextPositions((prev) => prev.map((pos) => (pos.id === selectedTextId ? { ...pos, opacity: value } : pos)))
            }
        },
        [selectedTextId],
    )

    const generateMeme = useCallback(() => {
        const canvas = canvasRef.current
        if (canvas && image) {
            const ctx = canvas.getContext("2d")
            if (ctx) {
                const img = new Image()
                img.onload = () => {
                    canvas.width = img.width
                    canvas.height = img.height
                    ctx.drawImage(img, 0, 0)
                    textPositions.forEach((pos) => {
                        ctx.save()
                        ctx.translate(pos.x, pos.y)
                        ctx.rotate((pos.rotation * Math.PI) / 180)

                        ctx.font = `${pos.italic ? "italic " : ""}${pos.bold ? "bold " : ""}${pos.size}px ${pos.font}`
                        ctx.fillStyle = pos.color
                        ctx.globalAlpha = pos.opacity
                        ctx.textAlign = "center"

                        const lines = pos.text.split("\n")
                        lines.forEach((line, idx) => {
                            const lineHeight = pos.size * 1.2
                            const yOffset = idx * lineHeight - ((lines.length - 1) * lineHeight) / 2
                            ctx.fillText(line, 0, yOffset)
                            if (pos.underline) {
                                const textWidth = ctx.measureText(line).width
                                ctx.beginPath()
                                ctx.moveTo(-textWidth / 2, yOffset + 3)
                                ctx.lineTo(textWidth / 2, yOffset + 3)
                                ctx.stroke()
                            }
                        })

                        ctx.restore()
                    })
                }
                img.src = image
            }
        }
    }, [image, textPositions])

    const downloadMeme = useCallback(async () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        try {
            // Convert canvas to Blob
            const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
            if (!blob) return;

            // Ensure File System API is available
            if (window.showSaveFilePicker) {
                try {
                    // Now TypeScript recognizes this function correctly
                    const fileHandle = await window.showSaveFilePicker({
                        suggestedName: "meme.png",
                        types: [{ description: "PNG Image", accept: { "image/png": [".png"] } }],
                    });

                    const writable = await fileHandle.createWritable();
                    await writable.write(blob);
                    await writable.close();
                } catch (error) {
                    if (error instanceof DOMException && error.name === "AbortError") {
                        console.warn("File save was canceled by the user.");
                        return;
                    }
                    throw error; // Handle unexpected errors
                }
            } else {
                // Fallback: Default browser download
                const link = document.createElement("a");
                link.download = "meme.png";
                link.href = URL.createObjectURL(blob);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } catch (error) {
            console.error("Error saving file:", error);
        }
    }, []);


    useEffect(() => {
        generateMeme()
    }, [generateMeme])

    const selectedText = textPositions.find((pos) => pos.id === selectedTextId)

    useEffect(() => {
        const preventRefresh = (e: TouchEvent) => {
            if (window.scrollY === 0 && e.touches[0].clientY > 50) {
                e.preventDefault();
            }
        };

        document.addEventListener("touchmove", preventRefresh, { passive: false });

        return () => {
            document.removeEventListener("touchmove", preventRefresh);
        };
    }, []);

    return (
        <div className="mx-auto max-w-lg container">
            <div className="flex justify-between items-center mb-2">
                <h1 className="font-bold text-2xl">Meme Generator</h1>
                <div className="">
                    <Button onClick={() => fileInputRef.current?.click()}>
                        <Upload className="size-4" />
                    </Button>

                </div>
            </div>
            <div className="hidden mb-2">
                <Label htmlFor="image-upload">Upload Image</Label>
                <Input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} ref={fileInputRef} />
            </div>




            {image && (<div className="z-50 relative mb-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <motion.div
                            drag
                            dragMomentum={false}
                            dragConstraints={{
                                top: -50,
                                left: -50,
                                right: window ? window.innerWidth - 50 : 0, // Adjust based on button width
                                bottom: window ? window.innerHeight - 50 : 0, // Adjust based on button height
                            }}
                            className="absolute cursor-grab active:cursor-grabbing"
                            whileDrag={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button variant="default" size={"icon"} className="" >
                                <Settings2 className="size-4" />
                            </Button>
                        </motion.div>
                    </PopoverTrigger>
                    <PopoverContent className="bg-background/50 backdrop-blur-sm min-w-80">
                        <div className="">
                            <div className="mb-4">
                                <Label htmlFor="text-add">
                                    In {addTextState ? "Add" : "Edit"} Text Mode {`(Toggle to change)`}
                                </Label>
                                <br />
                                <Toggle
                                    id="text-add"
                                    className="cursor-pointer"
                                    variant="outline"
                                    size="default"
                                    pressed={addTextState}
                                    onPressedChange={setAddTextState}
                                >
                                    <Type className="size-4" />
                                </Toggle>
                            </div>
                            {
                                <div className="mb-4">
                                    <Label htmlFor="text-input">Meme Text</Label>
                                    <Textarea
                                        rows={2}
                                        className="textarea-no-scrollbar"
                                        id="text-input"
                                        value={text}
                                        onChange={(e) => {
                                            setText(e.target.value)
                                            if (selectedTextId !== null) {
                                                setTextPositions((prev) =>
                                                    prev.map((pos) => (pos.id === selectedTextId ? { ...pos, text: e.target.value } : pos)),
                                                )
                                            }
                                        }}
                                        placeholder="Enter meme text"
                                    />
                                </div>
                            }

                            <div className="flex md:flex-row flex-col md:space-x-4">
                                <div className="mb-4 md:w-1/2">
                                    <Label htmlFor="text-size">Text Size</Label>
                                    <Slider
                                        id="text-size"
                                        min={10}
                                        max={500}
                                        step={1}
                                        value={[selectedText ? selectedText.size : 0]}
                                        onValueChange={(value) => handleTextSizeChange(value[0])}
                                    />
                                </div>
                                <div className="mb-4 md:w-1/2">
                                    <Label htmlFor="text-rotation">Text Rotation</Label>
                                    <Slider
                                        id="text-rotation"
                                        min={-180}
                                        max={180}
                                        step={1}
                                        value={[selectedText ? selectedText.rotation : -180]}
                                        onValueChange={(value) => handleTextRotationChange(value[0])}
                                    />
                                </div>
                            </div>

                            <div className="flex md:flex-row md:space-x-4">
                                <div className="mb-4 w-1/2">
                                    <Label htmlFor="text-color">{`Text Color `}
                                        {/* <span>
                                            {selectedText ? selectedText.color : "#000000"}
                                        </span> */}
                                    </Label>
                                    <br />
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                id="text-color"
                                                variant="outline"
                                                className="justify-start w-full font-normal text-left"
                                                style={{ backgroundColor: selectedText ? selectedText.color : "#000000" }}
                                            >
                                                <div
                                                    className="mr-2 border border-gray-200 rounded-full size-4"
                                                    style={{ backgroundColor: selectedText ? selectedText.color : "#000000" }}
                                                />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="flex flex-col gap-2 p-4 w-full">
                                            {/* Color Picker */}
                                            <HexColorPicker
                                                color={selectedText ? selectedText.color : "#000000"}
                                                onChange={handleTextColorChange}
                                            />

                                            {/* Hex Input Field */}
                                            <input
                                                type="text"
                                                className="p-2 border rounded-md w-full text-center"
                                                value={selectedText ? selectedText.color : "#000000"}
                                                onChange={(e) => handleTextColorChange(e.target.value)}
                                                maxLength={7}
                                                placeholder="#000000"
                                            />
                                        </PopoverContent>
                                    </Popover>

                                </div>
                                <div className="mb-4 w-1/2">
                                    <Label htmlFor="text-font">Text Font</Label>
                                    <Select onValueChange={handleTextFontChange} value={selectedText ? selectedText.font : "Impact"}>
                                        <SelectTrigger className="w-full text-xs">
                                            <SelectValue placeholder="Select a font" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {fonts.map((font) => (
                                                <SelectItem key={font} value={font}>
                                                    {font}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex space-x-2 mb-4">
                                <Toggle pressed={selectedText?.bold} onPressedChange={() => handleTextStyleChange("bold")}>
                                    <Bold className="size-4" />
                                </Toggle>
                                <Toggle pressed={selectedText?.italic} onPressedChange={() => handleTextStyleChange("italic")}>
                                    <Italic className="size-4" />
                                </Toggle>
                                <Toggle pressed={selectedText?.underline} onPressedChange={() => handleTextStyleChange("underline")}>
                                    <Underline className="size-4" />
                                </Toggle>
                            </div>

                            <div className="mb-4">
                                <Label htmlFor="text-opacity">Text Opacity</Label>
                                <Slider
                                    id="text-opacity"
                                    min={0}
                                    max={1}
                                    step={0.01}
                                    value={[selectedText ? selectedText.opacity : 1]}
                                    onValueChange={(value) => handleTextOpacityChange(value[0])}
                                />
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>)
            }

            <div className="relative mx-auto">
                {image && (
                    <canvas
                        ref={canvasRef}
                        onClick={handleCanvasClick}
                        onMouseMove={handleDrag}
                        onMouseUp={handleDragEnd}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        className="border border-gray-300 cursor-crosshair"
                        style={{ maxWidth: "100%", height: "auto" }}
                        width={canvasSize.width}
                        height={canvasSize.height}
                    />
                )}

                {!previewState &&
                    textPositions.map((pos) => (
                        <div
                            key={pos.id}
                            style={{
                                position: "absolute",
                                left: `${(pos.x / canvasSize.width) * 100}%`,
                                top: `${(pos.y / canvasSize.height) * 100}%`,
                                transform: "translate(-50%, -50%)",
                                cursor: isDragging && selectedTextId === pos.id ? "grabbing" : "grab",
                                border: selectedTextId === pos.id ? "2px solid blue" : "none",
                                padding: "2px",
                            }}
                            onMouseDown={(e) => handleDragStart(e, pos.id)}
                            onTouchStart={(e) => handleTouchStart(e, pos.id)}
                            onClick={() => {
                                setSelectedTextId(pos.id)
                                setText(pos.text)
                            }}
                            onMouseUp={handleDragEnd}
                            onTouchEnd={handleTouchEnd}
                            onTouchMove={handleTouchMove}
                        >
                            <div className="flex justify-center items-center bg-white shadow-md rounded-full w-6 h-6">
                                <Move className="size-4 text-gray-600" />
                            </div>

                            {selectedTextId === pos.id && (
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    className="top-0 right-0 absolute w-6 h-6 -translate-y-full translate-x-full transform"
                                    onClick={(e) => removeText(e, pos.id)}
                                >
                                    <X className="size-4" />
                                </Button>
                            )}
                        </div>
                    ))}
            </div>
            <div className="" >
                <div className="my-2 text-gray-600 text-sm">
                    {image ? (
                        <Popover>
                            <PopoverTrigger asChild>
                                <div className="flex flex-row items-center space-x-2 text-foreground whitespace-nowrap cursor-pointer">
                                    <Button variant={"default"} size={"icon"}>
                                        <Info className="size-4" />
                                    </Button>
                                    <p className="text-blue-400">
                                        Read Me
                                    </p>
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="bg-background/50 backdrop-blur-sm p-4 w-full min-w-80">
                                <ul className="ml-2 list-disc">
                                    <li>
                                        <p className="flex flex-row flex-wrap items-center gap-2">
                                            Click on the <Settings2 className="size-4" /> icon to customize text. <br />
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            Write meme text and click on the image to add text.
                                        </p>
                                    </li>
                                    <li>
                                        <p>

                                            Drag the move handle to reposition text.
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            Click on text to edit size and rotation.
                                        </p>
                                    </li>
                                    <li>
                                        <p className="flex flex-row flex-wrap justify-start items-center gap-2">
                                            You can move <Settings2 className="size-4" />.
                                        </p>
                                    </li>
                                </ul>
                            </PopoverContent>
                        </Popover>
                    ) : (
                        <>Choose an image to get started.</>
                    )}
                </div>
                {image && (
                    <div className="flex justify-evenly items-center gap-2">
                        <Toggle variant={"primary"} className="gap-2 w-full cursor-pointer" pressed={previewState} onPressedChange={setPreviewState}>
                            <ScanEye className="size-4" />
                            {
                                previewState ? "Hide Preview" : "Show Preview"
                            }
                        </Toggle>

                        <Button className="w-full" onClick={downloadMeme}>Download</Button>
                        <Button className="w-full" onClick={downloadMeme}>Publish</Button>
                    </div>
                )}
            </div>

            {/*btn edit image on phone device that open popover */}
            {/* copy custome text,color, ... */}



        </div>
    )
}

