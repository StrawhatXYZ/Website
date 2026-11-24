---
title: "Introducing Strawhat Labs"
description: "Why we're building robots that think on their own hardware, powered by small Gemma-based models."
publishDate: "2026-11-23"
tags: ["robotics", "gemma", "edge-ai"]
draft: false
---

Picture a robot halfway through a job when its network connection drops. If every decision it makes depends on a model running in a distant data center, it stops and waits. If the model runs on the robot itself, it keeps working.

That gap between a robot that waits and a robot that keeps going is why Strawhat Labs exists. We're a research and development team building autonomous robotic systems that do their thinking on their own hardware.

## What we're building

Our work brings two things together:

- **Robots that perceive and move on their own.** Hardware and software platforms with machine perception, spatial awareness and real-time motion planning.
- **Small language models that run on the robot.** Fine-tuned models built on Google's open-weights Gemma family, small enough to run on edge hardware instead of in the cloud.

A robot that can see and move is useful. A robot that can also understand its task and decide what to do next, without phoning home, can work in places where connectivity is unreliable and data is too sensitive to send anywhere.

## Why small models, and why on the robot

Large models get the headlines, and for good reason. But a robot doesn't need a model that can write poetry and summarize legal cases. It needs one that understands its own job very well and answers fast.

So we start from Gemma's smaller open models and train them for one domain at a time. We use parameter-efficient fine-tuning such as LoRA to teach a model a specific task without retraining the whole thing, and preference-based methods such as RLHF to shape how it behaves when the answer isn't obvious.

Running that model on the robot changes a few things:

- **Speed.** Decisions don't make a round trip to the cloud and back.
- **Resilience.** The robot keeps working when the network doesn't.
- **Privacy.** Camera feeds, sensor data and site layouts stay on your hardware or your private cloud, not ours.
- **Predictable costs.** You aren't paying per request to an external API every time a machine thinks.

The trade-off is real: a small model knows less about the world. That's fine, because we're not asking it to know the world. We're asking it to know one warehouse, one inspection route or one assembly line very well.

## What we're focused on now

Right now we're putting most of our effort into three areas:

1. **Autonomous control:** perception and motion planning that hold up outside the lab.
2. **On-robot intelligence:** fine-tuning Gemma-based models that run on edge devices with low latency.
3. **Operations at scale:** robotic workflows that recover from failures on their own and stay under the operator's control.

We'll use this blog to share what we learn along the way: what worked, what didn't, and the details that rarely make it into announcements.

## Work with us

If you're exploring autonomous robotics for your operations, or you'd like to collaborate on research, we'd like to hear from you. Email us at [obulapathinchalla@strawhat.xyz](mailto:obulapathinchalla@strawhat.xyz).
