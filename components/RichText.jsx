
import { BLOCKS } from '@contentful/rich-text-types'
import {documentToReactComponents} from '@contentful/rich-text-react-renderer'

const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="mb-4 text-[1rem]">{children}</p>
      ),
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1 className="mb-6">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h1 className="mb-6 text-[1.2rem]">{children}</h1>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h1 className="text-[1.15rem]">{children}</h1>
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        <h1 className="text-[1.1rem] mb-2 font-medium">{children}</h1>
      ),
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className="list-disc pl-5 mb-4">{children}</ul>
      ),
      // Add other node types and styles as needed
    },
  };

const RichText = ({content}) => {
    return (
        <>
            {documentToReactComponents(content, options)}
        </>
    )
}

export default RichText