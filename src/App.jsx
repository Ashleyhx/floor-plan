import React, {useState} from 'react';
import '@mantine/core/styles.css';
import {AppShell, Container, FileButton, Flex, ScrollArea, Select, Stack, TextInput, Title} from "@mantine/core";
import ReactPanZoom from "react-image-pan-zoom-rotate";
import {FileIcon} from "@radix-ui/react-icons";


function App() {
    const [images, setImages] = useState([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    const handleFileChange = (files) => {
        const newImages = Array.from(files).map(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            return new Promise((resolve) => {
                reader.onload = () => resolve(reader.result);
            });
        });

        Promise.all(newImages).then(images => {
            setImages(prevImages => [...prevImages, ...images]);
            if (selectedImageIndex === null && images.length > 0) {
                setSelectedImageIndex(0);
            }
        });
    };

    return (
        <AppShell
            header={{height: 50}}
            navbar={{
                width: 300,
                breakpoint: 'sm',
            }}
            padding="md"
        >
            <AppShell.Header>
                <Title order={2} style={{margin: 10}}>Adding Floor Plans</Title>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <ScrollArea scrollbars={"y"}>
                    <Stack gap="xl">
                        {images.map((src, index) => (
                            <img key={index} src={src} alt={`floor-plan-${index}`}
                                 style={{width: "100%"}}
                                 onClick={() => setSelectedImageIndex(index)}
                            />
                        ))}
                        <FileButton onChange={handleFileChange} accept="image/png,image/jpeg" multiple={true}>
                            {(props) => <Flex align="center" justify="center" style={{
                                width: "100%", height: 150,
                                borderStyle: "dashed", borderWidth: 2, borderColor: "black", borderRadius: 5,
                                cursor: "pointer"
                            }} onClick={props.onClick}>
                                <FileIcon/>
                            </Flex>}
                        </FileButton>
                    </Stack>
                </ScrollArea>

            </AppShell.Navbar>

            <AppShell.Main>
                <Title order={5}>Adjust Floor Plans</Title>
                {
                    images.map((src, index) => (
                        <div
                            style={{
                                position: "relative",
                                width: "70%",
                                height: 700,
                                overflow: "hidden",
                                background: "grey",
                                display: index === selectedImageIndex ? "block" : "none"
                            }}>
                            <ReactPanZoom
                                key={index}
                                image={src}
                            />
                        </div>))
                }
            </AppShell.Main>
            <AppShell.Aside>
                <Container size={"xl"}>
                    <Stack>
                        <TextInput
                            label="Floor Name"
                            type="text"
                            placeholder="enter the Floor Name here"
                        />
                        <TextInput
                            label="Interior Size"
                            type="text"
                            placeholder="enter the Interior Size here"
                        />
                        <TextInput
                            label="Exterior Size"
                            type="text"
                            placeholder="enter the Exterior Size here"
                        />
                        <TextInput
                            label="Exterior Type"
                            type="text"
                            placeholder="enter the Exterior Type here"
                        />
                        <Select
                            label="Facing Directions:"
                            placeholder="Select"
                            data={['North', 'South', 'East', 'West']}
                        />
                        <Select
                            label="Floor Type:"
                            placeholder="Select"
                            data={['Studio', 'One Bed One Bath', 'Two Bed One Bath', 'Three Bed Two Bath']}
                        />
                    </Stack>
                </Container>
            </AppShell.Aside>
        </AppShell>
    );
}

export default App;
