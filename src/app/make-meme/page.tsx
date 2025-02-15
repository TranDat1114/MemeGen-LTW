"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Toggle } from "@/components/ui/toggle"
import { X, Move, Type, ScanEye, Bold, Italic, Underline } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { HexColorPicker } from "react-colorful"

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

    const downloadMeme = useCallback(() => {
        const canvas = canvasRef.current
        if (canvas) {
            const link = document.createElement("a")
            link.download = "meme.png"
            link.href = canvas.toDataURL()
            link.click()
        }
    }, [])

    useEffect(() => {
        generateMeme()
    }, [generateMeme])

    const selectedText = textPositions.find((pos) => pos.id === selectedTextId)

    return (
        <div className="mx-auto p-4 max-w-lg container">
            <h1 className="mb-4 font-bold text-2xl">Meme Generator</h1>
            <div className="hidden mb-4">
                <Label htmlFor="image-upload">Upload Image</Label>
                <Input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} ref={fileInputRef} />
            </div>
            <Button className="mb-4" onClick={() => fileInputRef.current?.click()}>
                Choose Image
            </Button>

            {image && (
                <>
                    <div className="mb-4">
                        <Label htmlFor="text-add">
                            In {addTextState ? "Add" : "Edit"} Text Mode {`(Toggle to change)`}
                        </Label>
                        <br />
                        <Toggle
                            id="text-add"
                            variant="outline"
                            size="default"
                            pressed={addTextState}
                            onPressedChange={setAddTextState}
                        >
                            <Type className="w-4 h-4" />
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
                        <div className="mb-4 md:w-1/2">
                            <Label htmlFor="text-color">{`Text Color: `}
                                <span>
                                    {selectedText ? selectedText.color : "#000000"}
                                </span>
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
                                            className="mr-2 border border-gray-200 rounded-full w-4 h-4"
                                            style={{ backgroundColor: selectedText ? selectedText.color : "#000000" }}
                                        />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <HexColorPicker
                                        color={selectedText ? selectedText.color : "#000000"}
                                        onChange={handleTextColorChange}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="mb-4 md:w-1/2">
                            <Label htmlFor="text-font">Text Font</Label>
                            <Select onValueChange={handleTextFontChange} value={selectedText ? selectedText.font : "Arial"}>
                                <SelectTrigger className="w-full">
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
                            <Bold className="w-4 h-4" />
                        </Toggle>
                        <Toggle pressed={selectedText?.italic} onPressedChange={() => handleTextStyleChange("italic")}>
                            <Italic className="w-4 h-4" />
                        </Toggle>
                        <Toggle pressed={selectedText?.underline} onPressedChange={() => handleTextStyleChange("underline")}>
                            <Underline className="w-4 h-4" />
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
                </>
            )}

            <div className="relative mx-auto mb-4">
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
                                <Move className="w-4 h-4 text-gray-600" />
                            </div>

                            {selectedTextId === pos.id && (
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    className="top-0 right-0 absolute w-6 h-6 -translate-y-full translate-x-full transform"
                                    onClick={(e) => removeText(e, pos.id)}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            )}
                        </div>
                    ))}
            </div>
            <div className="flex flex-wrap gap-2">
                <p className="mt-4 text-gray-600 text-sm">
                    {image ? (
                        <>
                            Click on the image to add text. Drag the move handle to reposition text. <br /> Click on text to edit size
                            and rotation.
                        </>
                    ) : (
                        <>Choose an image to get started.</>
                    )}
                </p>
                {image && (
                    <>
                        <Toggle variant={"outline"} pressed={previewState} onPressedChange={setPreviewState}>
                            <ScanEye className="w-4 h-4" />
                            Preview
                        </Toggle>
                        <Button onClick={downloadMeme}>Download Meme</Button>
                        <Button onClick={downloadMeme}>To BlockChain</Button>
                    </>
                )}
            </div>
        </div>
    )
}

