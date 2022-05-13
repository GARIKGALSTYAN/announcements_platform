declare module "common" {
  export namespace User {
    export interface IRegisterBodyArgs {
      email: string,
      last_name: string,
      name: string,
      password: string,
      phone_number: undefined | string,
    }

    export interface ILoginBodyArgs {
      email: string,
      password: string,
    }

    export interface ILoginResult {
      refresh_token: string;
      access_token: string;
      access_token_expiry_date: string;
      role: string;
    }

    export interface IRevalidateBodyArgs {
      refresh_token: string;
    }

    export interface IRevalidateResult {
      access_token: string;
      access_token_expiry_date: string;
    }
  }
  export namespace Announcement {
    export interface IAnnouncementCreateBodyArgs {
      description: string;
      price: number;
      city: number;
      region: number;
      images: number[];
      tags: number[];
      categories: number[];
    }

    export interface IAnnouncementGetQueryArgs {
      price_min: undefined | string;
      price_max: undefined | string;
      city_ids: undefined | string[];
      region_ids: undefined | string[];
      tag_ids: undefined | string[];
      category_ids: undefined | string[];
      search_query: undefined | string;
    }

    export interface IAnnouncementUpdateBodyArgs {
      description: undefined | string;
      price: undefined | number;
      city: undefined | number;
      region: undefined | number;
      images: undefined | number[];
      tags: undefined | number[];
      categories: undefined | number[];
    }

    export interface IAnnouncementUpdateParamsArgs {
      id: number;
    }

    export interface IAnnouncementDeleteParamsArgs {
      id: number;
    }

    export interface IAnnouncement {
      id: number;
      description: string;
      price: number;
      region: string;
      city: string;
      images: Image.IImage[];
      tags: Tag.ITag[];
      categories: Category.ICategory[];
    }
  }
  export namespace City {
    export interface ICityCreateBodyArgs {
      name: string;
    }
    export interface ICity {
      id: number;
      name: string;
    }
  }
  export namespace Region {
    export interface IRegionCreateBodyArgs {
      name: string;
    }
    export interface IRegion {
      id: number;
      name: string;
    }
  }
  export namespace Category {
    export interface ICategory {
      id: number;
      name: string;
    }
    export interface ICategoryCreateBodyArgs {
      name: string;
    }
  }
  export namespace Tag {
    export interface ITagCreateBodyArgs {
      name: string;
    }
    export interface ITag {
      id: number;
      name: string;
    }
  }
  export namespace Image {
    export interface IImage {
      id: number;
      url: string;
    }

    export interface IImageCreateBodyArgs {
      image_base_64: string;
    }
  }
}
