import React from 'react'
import Header from '../components/Header'
import LocationSearchInput from '../components/LocationSearchInput'
import ImageCrop from '../components/ImageCropper'
import getCroppedImg from '../services/CropImage'
import ApiService from '../services/ApiService'
import FileService from '../services/FileService'
import OBContext from '../OBContext'
import '../stylesheets/EditProfile.css'

const {GRADES} = require('../constants')

class EditProfile extends React.Component{
    static contextType = OBContext

    constructor(props){
        super(props)
        this.state = {
            name: '',
            photo: null,
            photo_url: '',
            bio: '',
            sport: false,
            trad: false,
            min_grade: '5.0',
            max_grade: '5.0',
            location: null,
            locationTouched: false,
            radius: null,
            gradeOptions: [],
            phone: '',
            cropperSrc: '',
        }

        this.updateLocation = this.updateLocation.bind(this)
    }

    componentDidMount(){
        const gradeOptions = []
        for (let i = 0; i < GRADES.length; i++){
            gradeOptions.push(<option key={i} value={GRADES[i]}>{GRADES[i]}</option>)
        }
        this.setState({gradeOptions})
        this.loadUser()
    }

    loadUser(){
        const user = this.context.user
        user.sport = !!user.sport
        user.trad = !!user.trad

        this.setState({...user})
    }
    //update methods
    updateName(name){
        this.setState({name})
    }
    updatePhoto(photo){
        this.setState({photo})
        if (photo){
            FileService.readFile(photo)
            .then(photo_url => {
                this.setState({cropperSrc: photo_url})
            })
        }
        else{
            this.setState({photo_url: this.context.user.photo_url})
        }
    }
    updateBio(bio){
        this.setState({bio})
    }
    updateStyles(style){
        if (style === 'sport'){
            this.setState({sport: !this.state.sport})
        }
        else if (style === 'trad'){
            this.setState({trad: !this.state.trad})
        }
    }
    updateMinGrade(min_grade){
        this.setState({min_grade})
    }
    updatePhone(phone){
        this.setState({phone})
    }
    updateMaxGrade(max_grade){
        this.setState({max_grade})
    }
    updateLocation(address, latLng){
        this.setState({address, location: latLng, locationChanged: true})
    }
    updateRadius(radius){
        this.setState({radius})
    }
    cancelCrop(){
        this.fileInput.value =''
        this.setState({cropperSrc: '', photo_url: this.context.user.photo_url})
    }
    saveCrop(pixels){
        getCroppedImg(this.state.cropperSrc, pixels)
            .then(res => {
                const photo = FileService.blobToFile(res.blob, 'photo')
                this.setState({photo_url: res.url, photo, cropperSrc: ''})
            })
    }
    

    handleSubmit(e){
        e.preventDefault()

        const user = {
            name: this.state.name, 
            bio: this.state.bio,
            styles: this.state.styles,
            min_grade: this.state.min_grade,
            max_grade: this.state.max_grade,
            radius: this.state.radius,
            sport: this.state.sport,
            trad: this.state.trad,
            phone: this.state.phone,
        }
        if (this.state.locationChanged){
            user.address = this.state.address
            user.latitude = this.state.location.lat
            user.longitude = this.state.location.lng
        }

        const user_id = this.context.user.id

        //ordering for these three separate promises...

        
        ApiService.updateUser(user, user_id)
            .then(userRes => {
                if (this.state.photo){
                    ApiService.updatePhoto(this.state.photo, user_id)
                        .then(userRes => {
                            this.context.methods.updateUser(userRes)
                            this.props.history.push(`/user_profile/${this.context.user.id}`)        
                        })
                }
                else{
                    this.context.methods.updateUser(userRes)
                    this.props.history.push(`/user_profile/${this.context.user.id}`)
                }
    
            })
}

    render(){

        const cropper = this.state.cropperSrc ? <ImageCrop cancelCrop={() => this.cancelCrop()} saveCrop={(pixels) => this.saveCrop(pixels)} imageSrc={this.state.cropperSrc}/> : ''
        const disableSave = !(
            this.state.name 
            && (this.state.sport || this.state.trad) 
            && (this.state.radius > 0) 
            && (this.state.address || this.context.user.address) 
            && (this.state.photo || this.state.photo_url)
            && this.state.phone
        )

        return (
            <div className='edit-profile-page'>
                {cropper}
                <Header match={this.props.match} pageTitle='Edit Profile' history={this.props.history} displayNav={true}/>
                <form className='edit-profile-form'>
                    <div className='form-elements'>
                        <div className='form-element'>
                            <label htmlFor='photo'>profile photo</label>
                            <input className='input-block' type='file' id='photo' name='photo' onChange={e=> this.updatePhoto(e.target.files[0])} ref={ref=> this.fileInput = ref}/>
                            {this.state.photo_url ? <img className='edit-profile-photo' src={this.state.photo_url} alt='current profile pic'/> : ''}
                        </div>
                        <div className='form-element'>
                            <label htmlFor='name'>name</label>
                            <input className='input-block' type='text' id='name' name='name' defaultValue={this.state.name} onChange={e=> this.updateName(e.target.value)}/>
                        </div>
                        <div className='form-element'>
                            <label htmlFor='bio'>about</label>
                            <textarea className='input-block' id='bio' name='bio' defaultValue={this.state.bio} onChange={e => this.updateBio(e.target.value)}></textarea>
                        </div>
                        <div className='form-element'>
                            <label htmlFor='styles'>styles</label>
                            <div className='styles input-block'>
                                <div className='styles-checkbox'>
                                    <input id='sport' name='sport' type='checkbox' value='sport' checked={this.state.sport} onChange={e => this.updateStyles(e.target.value)}/>
                                    <label htmlFor='sport' className='sub-label'>sport</label>
                                </div>
                                <div className='styles-checkbox'>
                                    <input id='trad' name='trad' type='checkbox' value='trad' checked={this.state.trad} onChange={e => this.updateStyles(e.target.value)}/>
                                    <label htmlFor='sport' className='sub-label'>trad</label>
                                </div> 
                            </div>
                        </div>
                        <div className='form-element'>
                            <label htmlFor='max-grade'>highest redpoint</label>
                            <div id='redpoint' className='input-block'>
                                <select className='input-block grade-dropdown' id='max-grade' onChange={e => this.updateMaxGrade(e.target.value)} value={this.state.max_grade}>
                                    {this.state.gradeOptions}
                                </select>
                            </div>
                        </div>
                        <div className='form-element'>
                            <label htmlFor='phone'>phone (will be visible to your partners as a form of contact)</label>
                            <div className='input-block'>
                                <input id='phone' type='text' defaultValue={this.state.phone} onChange={e => this.updatePhone(e.target.value)}/>
                            </div>
                        </div> 
                        <div className='form-element seeking-block'>
                            <label htmlFor='grade-inputs'>seeking partners that...</label>
                            <div className='seeking-inputs'>
                                <div className='input-block'>
                                    <span>climb at least</span>
                                    <select className='input-block grade-dropdown' id='min-grade' onChange={e => this.updateMinGrade(e.target.value)} value={this.state.min_grade}>
                                        {this.state.gradeOptions}
                                    </select>
                                </div>
                                <div id='radius-input-container' className='input-block'>
                                    <span>within</span>
                                    <input id='radius' name='radius' type='number' defaultValue={this.state.radius} onChange={e => this.updateRadius(e.target.value)}/>
                                    <span>miles of...</span>
                                </div>
                                <div className='input-block'>
                                    <LocationSearchInput updateLocation={(address, location) => this.updateLocation(address, location)} address={this.state.address}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='button-container'>
                        <button 
                            type='submit' 
                            className={`save-button ${disableSave && 'disabled'}`}
                            onClick={e => this.handleSubmit(e)}
                            disabled={disableSave}
                        >
                        Save
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default EditProfile