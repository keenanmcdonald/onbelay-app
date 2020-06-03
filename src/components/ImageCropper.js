import React from 'react'
import Cropper from 'react-easy-crop'

class ImageCropper extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            imageSrc: props.imageSrc,
            crop: { x: 0, y: 0 },
            zoom: 1,
            aspect: 4 / 3,
            croppedAreaPixels: {}
          }
    }

  onCropChange = crop => {
    this.setState({crop})
  }

  onCropComplete = (croppedArea, croppedAreaPixels) => {
    this.setState({croppedAreaPixels})
  }

  handleSave(){
    this.props.saveCrop(this.state.croppedAreaPixels)
  }

  render() {
    return (
      <div className='image-cropper-container'>
        <div className="crop-container">
            <Cropper
                image={this.state.imageSrc}
                crop={this.state.crop}
                zoom={this.state.zoom}
                aspect={this.state.aspect}
                onCropChange={this.onCropChange}
                onCropComplete={this.onCropComplete}
                onZoomChange={this.onZoomChange}
            />
        </div>
        <div className='crop-buttons-container'>
          <button className='cancel' onClick={() => this.props.cancelCrop()}>Cancel</button>
          <button onClick={() => this.handleSave()}>Save</button>
        </div>
      </div>
      
    )
  }
}

export default ImageCropper