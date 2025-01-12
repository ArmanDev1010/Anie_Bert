import type { Schema, Struct } from '@strapi/strapi';

export interface ExpertiseText extends Struct.ComponentSchema {
  collectionName: 'components_expertise_texts';
  info: {
    description: '';
    displayName: 'text';
  };
  attributes: {
    text: Schema.Attribute.String;
  };
}

export interface ImageImage extends Struct.ComponentSchema {
  collectionName: 'components_image_images';
  info: {
    displayName: 'image';
  };
  attributes: {
    category: Schema.Attribute.Enumeration<
      ['kitchen', 'bathroom', 'bedroom', 'living room', 'kids room']
    >;
    image: Schema.Attribute.Media<'images' | 'files'>;
  };
}

export interface ImageImageAndCategory extends Struct.ComponentSchema {
  collectionName: 'components_image_image_and_categories';
  info: {
    displayName: 'Image_and_category';
    icon: 'picture';
  };
  attributes: {};
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'expertise.text': ExpertiseText;
      'image.image': ImageImage;
      'image.image-and-category': ImageImageAndCategory;
    }
  }
}
