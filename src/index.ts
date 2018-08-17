import { IRenderMime } from '@jupyterlab/rendermime-interfaces';



import { Widget } from '@phosphor/widgets';

import '../style/index.css';

/**
 * The default mime type for the extension.
 */
const MIME_TYPE = 'video/mp4';

/**
 * The class name added to the extension.
 */
const CLASS_NAME = 'mimerenderer-mp4';

/**
 * A widget for rendering mp4.
 */
export class OutputWidget extends Widget implements IRenderMime.IRenderer {
  /**
   * Construct a new output widget.
   */
  constructor(options: IRenderMime.IRendererOptions) {
    super();
    this._mimeType = options.mimeType;
    this.addClass(CLASS_NAME);
  }

  /**
   * Render mp4 into this widget's node.
   */
  renderModel(model: IRenderMime.IMimeModel): Promise<void> {
    
    let data = model.data[this._mimeType] as string;
    this.node.textContent = data.slice(0, 16384);
    
    return Promise.resolve();
  }

  private _mimeType: string;
}

/**
 * A mime renderer factory for mp4 data.
 */
export const rendererFactory: IRenderMime.IRendererFactory = {
  safe: true,
  mimeTypes: [MIME_TYPE],
  createRenderer: options => new OutputWidget(options)
};

/**
 * Extension definition.
 */
const extension: IRenderMime.IExtension = {
  id: 'jupyterlab-mp4:plugin',
  rendererFactory,
  rank: 0,
  dataType: 'string',
  fileTypes: [
    {
      name: 'mp4',
      mimeTypes: [MIME_TYPE],
      extensions: ['.mp4']
    }
  ],
  documentWidgetFactoryOptions: {
    name: 'JupyterLab mp4 viewer',
    primaryFileType: 'mp4',
    fileTypes: ['mp4'],
    defaultFor: ['mp4']
  }
};

export default extension;