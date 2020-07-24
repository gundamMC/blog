---
title: "P106-100 Mining GPU – Review & Benchmark"
date: 2019-02-08
image: /images/p106/P106.jpg
tag: 
  - Hardware
---

Since the Chinese “hack” allowing the mining GPU to run DirectX, the P106 has gained enormous attention within the international hardware community. Before the hack, prices on Taobao varied around 200 RMB (about 30 USD). After the hack, prices nearly doubled to 400 RMB (60 USD). So, then, what is the P106?

## Hacking the P106

The P106 was originally meant to be a mining GPU. There are no display outputs, no video-encoding support, and no directX. This, however, was changed with the hack.

By modifying NVIDIA’s drivers, the P106 is able to be seen as a GTX1060. And, with Window’s feature to run a “high-performance” gpu through the display of an integrated gpu, as often used in laptops, we can use the P106 to run games and other gpu-demanding applications.

<iframe width="560" height="315" src="https://www.youtube.com/embed/O1nok2VlF1M" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
</iframe>

The hack demonstrated by LinusTechTips

## First Look

I ordered a P106 a few days ago, and it arrived surprisingly soon.

![Gigabyte P106-100](/images/p106/P106.jpg)

On a simple glance, the card looks fairly clean, with just a few signs of mining. However, if we take a closer look, we can find more. There are dusts within the heatsink, which would be impossible to reach without taking the card apart; the fans are a bit worn out; and the “cleanness” of the outer layer makes it seem extremely suspicious.

In case if you do not know, washing second-hand computer components for sale is quite common in China. [Chinese discussion on Zhihu](https://www.zhihu.com/question/50120227). Sellers, especially on Taobao, clean their hardwares with water, saving time and energy. Although it is technically safe if the card is properly dried, there are hidden future risks.

## Benchmark Setup

The bench used has the following specs:

* CPU: E2146G (will be doing a review/benchmark post on this soon)
* Motherboard: Gigabyte Z170X Gaming 3
* RAM: Single G.Skill Aegis 8GB DDR4 2666
* GPU: Gigabyte NVIDIA P106-100
* Storage: Crucial mx500 512GB
* PSU: Corsiar CX550
* CPU Cooler: Arctic Freezer 33 eSports ONE
* Case: Fractal Design Meshify C

## Benchmark

![10402 on Fire Strike](/images/p106/fire-strike.jpg)
10402 on Fire Strike

![4241 on Time Spy](/images/p106/time-spy.jpg)
4241 on Time Spy

![49 FPS on Origins](/images/p106/origins.jpg)
Average 49 FPS on Assassin's Creed: Origins Benchmark with Very High Settings 1080p

## Conclusion

Overall, the P106 performs very close - only a bit lower - to a GTX 1060 as expected (probably since they are basically the same thing). The temperature was alright with it sitting at an idle temperature of around 30 degrees Celsius and 50-ish when running Origins.

Thus, the P106 is, as far as my limited experience with it can tell, a good deal for only around $60. The performance is extremely similar to a GTX1060, with only some slight decreases due to its lack of direct video outputs. Although it might have been under constant load for months, everything seems fine as for now. I have not tried overclocking it, and probably never will.

Even if you’re not using for gaming, the P106 can be used for other calculation-heavy tasks, such as training deep learning models, 3D Rendering, and even CUDA-accelerating (e.g. in Adobe Premiere).
