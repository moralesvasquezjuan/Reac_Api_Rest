
'use client';

import styles from '../../../page.module.css';
import { Card, CardBody, Heading, Textarea } from '@chakra-ui/react';
import { Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { createClient } from "../../../services/supabase";
import { useState } from "react";


const supabase = createClient();


export default function Post(){

    const [newTitle, setNewTitle]= useState("");
    const [newContent, setNewContent]= useState("");
    
    async function seve(){
        console.log('seve new post');
        const {data: { user }} = await supabase.auth.getUser();
        console.log(user);

      await supabase.from('blog').insert({
            user_id: user?.id,
            title: newTitle,
            content: newContent,
            
        });
    }



    return(
            <main className={styles.main}>
      <div className={styles.description} style={{ marginBottom: "1rem" }}>
        <Heading>Nuevo post</Heading>
      </div>
      <div>
        <Card>
            <CardBody>
             <FormControl>
                <FormLabel>Title</FormLabel>
                <Textarea value={newTitle} onChange={(e) => {setNewTitle(e.target.value)}}></Textarea>
            </FormControl> 
            <FormControl>
                <FormLabel>contenido</FormLabel>
                <Input value={newContent} onChange={(e) => {setNewContent(e.target.value)}}></Input>
                </FormControl> 
                <Button mt={4} colorScheme='blue' onClick={(e)=> {
                        e.preventDefault();
                        e.stopPropagation();
                        seve();
                    }}>Guardar</Button>  
            </CardBody>
        </Card>
      </div>
        </main>
    );
}