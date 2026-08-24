export type CategoryInfo = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  image: string;
  icon: string;
};

export const categories: CategoryInfo[] = [
  {
    slug: 't-shirts',
    name: 'T-Shirts',
    shortName: 'T-Shirts',
    description: 'Custom screen-printed and embroidered t-shirts in every style, color, and size.',
    image: 'https://images.pexels.com/photos/8146450/pexels-photo-8146450.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'shirt',
  },
  {
    slug: 'polos-knits',
    name: 'Polos / Knits',
    shortName: 'Polos',
    description: 'Professional embroidered polos and knit shirts for your team and brand.',
    image: 'https://images.pexels.com/photos/19568392/pexels-photo-19568392.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'shirt-collar',
  },
  {
    slug: 'sweatshirts-fleece',
    name: 'Sweatshirts / Fleece',
    shortName: 'Sweatshirts',
    description: 'Warm, cozy hoodies, crewnecks, and fleece jackets with your logo.',
    image: 'https://images.pexels.com/photos/9695919/pexels-photo-9695919.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'hoodie',
  },
  {
    slug: 'caps',
    name: 'Caps',
    shortName: 'Caps',
    description: 'Embroidered snapbacks, dad hats, trucker caps, and more headwear styles.',
    image: 'https://images.pexels.com/photos/18434487/pexels-photo-18434487.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'cap',
  },
  {
    slug: 'activewear',
    name: 'Activewear',
    shortName: 'Activewear',
    description: 'Performance tees, shorts, and track jackets for athletics and active teams.',
    image: 'https://images.pexels.com/photos/17872898/pexels-photo-17872898.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'activity',
  },
  {
    slug: 'outerwear',
    name: 'Outerwear',
    shortName: 'Outerwear',
    description: 'Jackets, windbreakers, and puffers to keep your team warm and branded.',
    image: 'https://images.pexels.com/photos/38561616/pexels-photo-38561616.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'cloud-rain',
  },
  {
    slug: 'woven-shirts',
    name: 'Woven Shirts',
    shortName: 'Woven',
    description: 'Flannels, oxfords, and camp shirts for a polished, layered look.',
    image: 'https://images.pexels.com/photos/30283737/pexels-photo-30283737.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'layers',
  },
  {
    slug: 'bags',
    name: 'Bags',
    shortName: 'Bags',
    description: 'Totes, drawstring packs, and cooler bags — great promos with your logo.',
    image: 'https://images.pexels.com/photos/1214212/pexels-photo-1214212.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'shopping-bag',
  },
  {
    slug: 'workwear',
    name: 'Workwear',
    shortName: 'Workwear',
    description: 'Hi-vis vests, work shirts, and coveralls built tough for the job site.',
    image: 'https://images.pexels.com/photos/39148282/pexels-photo-39148282.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'hard-hat',
  },
  {
    slug: 'accessories',
    name: 'Accessories',
    shortName: 'Accessories',
    description: 'Tumblers, sunglasses, beanies, and more branded accessories.',
    image: 'https://images.pexels.com/photos/32677227/pexels-photo-32677227.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'glasses',
  },
  {
    slug: 'personal-protection',
    name: 'Personal Protection',
    shortName: 'PPE',
    description: 'Face masks, gloves, and safety essentials for your workplace.',
    image: 'https://images.pexels.com/photos/4541395/pexels-photo-4541395.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'shield',
  },
  {
    slug: 'ladies',
    name: 'Ladies',
    shortName: 'Ladies',
    description: 'Tailored tees, polos, and fleece sized and styled for women.',
    image: 'https://images.pexels.com/photos/28666277/pexels-photo-28666277.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'user',
  },
  {
    slug: 'youth',
    name: 'Youth',
    shortName: 'Youth',
    description: 'Tees, hoodies, and jerseys sized for kids and young athletes.',
    image: 'https://images.pexels.com/photos/15304383/pexels-photo-15304383.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'baby',
  },
];

export function getCategory(slug: string): CategoryInfo | undefined {
  return categories.find((c) => c.slug === slug);
}
