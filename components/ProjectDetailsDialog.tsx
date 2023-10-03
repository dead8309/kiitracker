"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Github, HelpCircle, Youtube } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";


type Props = {};

const ProjectDetailsDialog = (props: Props) => {
    return (
      <Dialog>
        <DialogTrigger>
          <span className="flex items-center px-2 py-1 text-white rounded-md bg-slate-800">
            What is this
            <HelpCircle className="w-5 h-5 ml-1" />
          </span>
        </DialogTrigger>
        <DialogContent className="w-[70vw] max-w-[100vw] md:w-[50vw]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Welcome to KIITracker!</DialogTitle>
            <DialogDescription>
              <div className="flex items-center gap-3 my-2">
                <p className="flex items-center">
                  <Github className="w-5 h-5" />
                  <Link
                    className="ml-1 underline"
                    href={siteConfig.github}
                  >
                    GitHub
                  </Link>
                </p>
                <p className="flex items-center">
                  <Youtube className="w-5 h-5" />
                  <Link
                    className="ml-1 underline"
                    href={siteConfig.youtube}
                  >
                    YouTube
                  </Link>
                </p>
              </div>
              <p className="my-2 mt-4 ">
              Are you tired of boring, complex schedules for your classes? 
              Bid farewell to mundane and tedious routines with KIITracker! 
              Our platform simplifies and personalizes your class schedule, 
              ensuring a hassle-free experience tailored just for you.
              </p>
              <hr />
              <p className="my-2 font-semibold">
                <h4 className="text-base font-semibold">Built with</h4>
                <div className="grid justify-around grid-cols-3 lg:grid-cols-4 mt-2 gap-y-3">
                    <div className="flex items-center gap-2">
                        <Image
                        alt="firebase"
                        src="/firebase.png"
                        width={30}
                        height={30}
                        />
                        <span className="">Firebase</span>
                    </div>
                  <div className="flex items-center gap-2">
                    <Image
                      alt="nextjs"
                      src="/nextjs.png"
                      width={35}
                      height={35}
                    />
                    <span className="">Next.js</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      alt="tailwind"
                      src="/tailwind.png"
                      width={35}
                      height={35}
                    />
                    <span className="">Tailwind</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      alt="typescript"
                      src="/typescript.png"
                      width={30}
                      height={30}
                    />
                    <span className="">TypeScript</span>
                  </div>
                </div>
              </p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default ProjectDetailsDialog;