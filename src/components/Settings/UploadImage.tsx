import { Menu, Dropdown, Space } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons'
import { ReactSetState } from "types";

interface Props {
    imgUrl: string;
    setImgUrl: ReactSetState<string>;
    setFile: ReactSetState<File | null>;
}


export default function UploadImage({
    imgUrl,
    setImgUrl,
    setFile
}: Props) {
    function uploadHandler(e: React.ChangeEvent<HTMLInputElement>) {
        e.stopPropagation()
        if (!e.target.files) return;
        const file = e.target.files[0]
        setFile(file)
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (e) => {
            if (typeof e.target?.result === 'string') {
                setImgUrl(e.target.result);
            }
        };
    }

    // function downloadHandler(e: any) {
    //   e.stopPropagation()
    //   //TODO: Implement
    //   console.log('download handler');
    // }

    // function deleteHandler(e: any) {
    //   e.stopPropagation()
    //   e.nativeEvent.stopImmediatePropagation()
    //   //TODO: Implement
    //   console.log('delete handler');
    // }

    const menu = (
        <Menu
            items={[
                {
                    label:
                        <div>
                            Subir
                            <input
                                type="file"
                                accept="image/"
                                onChange={uploadHandler}
                                className="absolute top-0 right-0 w-full h-full outline-none opacity-0 cursor-pointer"
                            />
                        </div>,
                    key: '0',
                },
                {
                    label: 'Download',
                    key: '1',
                },
                {
                    type: 'divider',
                },
                {
                    label: 'Delete',
                    key: '3',
                    danger: true
                },
            ]}
        />
    );



    return (
        <div className="my-8 relative">
            <label htmlFor="Image">
                <h1 className="text-sm font-bold text-gray-200">Image</h1>
            </label>
            <button className="dark:bg-stone-900 bg-gray-200 w-full h-72 relative outline focus:outline-2 focus:outline-blue-600 outline-1 outline-gray-400 dark:outline-gray-700 cursor-default mt-2 dark:focus:outline-blue-600">
                <img src={imgUrl} alt="" className="h-full mx-auto" />
            </button>
            <Dropdown overlay={menu} trigger={['click']} className="cursor-pointer">
                <div className="absolute w-8 h-8 bg-white dark:bg-black dark:border-gray-700 dark:text-gray-400 text-gray-500 hover:bg-zinc-700 hover:bg-opacity-80 hover:text-white border-gray-300 border rounded-sm mt-2 top-[2.25rem] right-2">
                    <button
                        className="w-full h-full grid place-items-center"
                    >
                        <a>
                            <Space>
                                <EllipsisOutlined style={{ color: '#F5F5F5' }} />
                            </Space>
                        </a>
                    </button>
                </div>
            </Dropdown>
        </div>
    );
}
